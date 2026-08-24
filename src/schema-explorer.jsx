import { useCallback, useMemo, useState } from "react";

// A browsable rendering of the tt_export JSON Schema.
//
// Everything here is derived from the schema document itself rather than
// re-described by hand, so the page cannot drift from the file it documents:
// re-vendoring a newer schema (npm run tt-export:sync) is enough to update
// what this draws. This copy is vendored beside the one served for download
// at /schemas/tt-export-v2.json; scripts/sync-tt-export.mjs writes both from
// the same source and hashes each, so they cannot disagree.
import schema from "./tt-export/tt-export.schema.json";

const TYPE_COLORS = {
  string: "blue",
  number: "orange",
  integer: "orange",
  boolean: "purple",
  object: "teal",
  array: "green",
  null: "grey",
};

function resolveRef(ref) {
  if (!ref.startsWith("#/")) return null;
  let node = schema;
  for (const part of ref.slice(2).split("/")) {
    node = node?.[part.replace(/~1/g, "/").replace(/~0/g, "~")];
  }
  return node || null;
}

// A node plus the name of the definition it came from, if it is a $ref.
function deref(node) {
  if (node && node.$ref) {
    const resolved = resolveRef(node.$ref);
    if (resolved) {
      return { node: resolved, refName: node.$ref.split("/").pop() };
    }
  }
  return { node: node || {}, refName: null };
}

function typeChips(node) {
  if (node.const !== undefined) return ["const"];
  if (node.enum) return ["enum"];
  const type = node.type;
  if (!type) return [];
  return Array.isArray(type) ? type : [type];
}

function literal(value) {
  return typeof value === "string" ? `"${value}"` : JSON.stringify(value);
}

// An `if` of the shape {properties: {collection: {const: "passages"}}} is the
// schema's way of saying "this rule applies to passage lines". Read it back
// out as that sentence rather than drawing the machinery.
function conditionLabel(condition) {
  const properties = condition?.properties || {};
  const parts = Object.entries(properties).map(([name, constraint]) => {
    if (constraint.const !== undefined)
      return `${name} = ${literal(constraint.const)}`;
    if (constraint.enum)
      return `${name} is one of ${constraint.enum.map(literal).join(", ")}`;
    return name;
  });
  return parts.length ? `when ${parts.join(" and ")}` : "in some cases";
}

// Object wrappers that exist only to reach one field carry no information of
// their own, so collapse `{doc: {properties: {data: X}}}` down to a single
// row named `doc.data`. Keeps the conditional shapes one line deep instead
// of four.
function squash(name, node) {
  let current = node;
  let path = name;
  for (;;) {
    const { node: resolved, refName } = deref(current);
    if (refName) return { name: path, node: current };
    const properties = resolved.properties;
    const names = properties ? Object.keys(properties) : [];
    if (resolved.description || names.length !== 1)
      return { name: path, node: current };
    path = `${path}.${names[0]}`;
    current = properties[names[0]];
  }
}

// Descriptions in the schema are written with markdown-ish backticks around
// field names. Honour them rather than printing the backticks.
function Prose({ text }) {
  return (
    <>
      {text
        .split("`")
        .map((part, i) =>
          i % 2 ? <code key={i}>{part}</code> : <span key={i}>{part}</span>,
        )}
    </>
  );
}

function Chip({ color, children, title }) {
  return (
    <span className={`schema-chip schema-chip-${color}`} title={title}>
      {children}
    </span>
  );
}

// One row of the tree: a field name, what it may hold, and what it is for.
// Renders its children only while open, so the deep parts of the schema cost
// nothing until someone asks for them.
function SchemaNode({ name, node, required, depth, mode, kind }) {
  const [openOverride, setOpenOverride] = useState(null);
  const { node: resolved, refName } = deref(node);

  const properties = resolved.properties || {};
  const propertyNames = Object.keys(properties);
  const requiredNames = new Set(resolved.required || []);
  const items = resolved.items;
  const itemsAreInteresting = items && (items.$ref || items.properties);
  const conditionals = (resolved.allOf || [])
    .filter((entry) => entry.if && entry.then)
    .map((entry) => ({ label: conditionLabel(entry.if), then: entry.then }));

  const hasChildren =
    propertyNames.length > 0 || itemsAreInteresting || conditionals.length > 0;
  // Default: the first two levels, which is the whole of a header line and
  // the shape of a document line. `mode` is the toolbar overriding that.
  const defaultOpen = mode === null ? depth <= 1 : mode;
  const open = openOverride === null ? defaultOpen : openOverride;

  const chips = typeChips(resolved);
  const description = node.description || resolved.description;

  return (
    <div className={`schema-node schema-depth-${Math.min(depth, 4)}`}>
      <div
        className={`schema-row${hasChildren ? " schema-clickable" : ""}`}
        onClick={hasChildren ? () => setOpenOverride(!open) : undefined}
      >
        {hasChildren ? (
          <span className={`schema-caret${open ? " schema-open" : ""}`}>▸</span>
        ) : (
          <span className="schema-caret schema-caret-empty">·</span>
        )}
        <span className={`schema-name${kind ? ` schema-name-${kind}` : ""}`}>
          {name}
        </span>
        {required && (
          <span className="schema-required" title="always present">
            required
          </span>
        )}
        {chips.map((type) => (
          <Chip key={type} color={TYPE_COLORS[type] || "pink"}>
            {type}
          </Chip>
        ))}
        {resolved.type === "array" && (
          <Chip color={TYPE_COLORS[deref(items).node.type] || "teal"}>
            of {deref(items).refName || deref(items).node.type || "value"}
          </Chip>
        )}
        {refName && !resolved.enum && (
          <span className="schema-ref">{refName}</span>
        )}
        {resolved.const !== undefined && (
          <Chip color="pink">{literal(resolved.const)}</Chip>
        )}
        {resolved.enum &&
          resolved.enum.map((value) => (
            <Chip key={String(value)} color="pink">
              {literal(value)}
            </Chip>
          ))}
        {resolved.pattern && (
          <Chip color="grey" title="regular expression the value must match">
            {resolved.pattern}
          </Chip>
        )}
      </div>
      {description && (
        <p className="schema-description">
          <Prose text={description} />
        </p>
      )}
      {open && hasChildren && (
        <div className="schema-children">
          {propertyNames.map((child) => (
            <SchemaNode
              key={child}
              name={child}
              node={properties[child]}
              required={requiredNames.has(child)}
              depth={depth + 1}
              mode={mode}
            />
          ))}
          {itemsAreInteresting && (
            <SchemaNode
              name="each item"
              node={items}
              depth={depth + 1}
              mode={mode}
              kind="meta"
            />
          )}
          {conditionals.map((conditional) => {
            const inner = conditional.then.properties || {};
            return Object.entries(inner).map(([child, childNode]) => {
              const flat = squash(child, childNode);
              return (
                <div
                  className="schema-conditional"
                  key={`${conditional.label}-${child}`}
                >
                  <div className="schema-condition-label">
                    {conditional.label}
                  </div>
                  <SchemaNode
                    name={flat.name}
                    node={flat.node}
                    depth={depth + 1}
                    mode={mode}
                  />
                </div>
              );
            });
          })}
        </div>
      )}
    </div>
  );
}

export function SchemaExplorer() {
  // The two line shapes a file can contain, in the order they appear in it.
  const roots = useMemo(() => {
    const titles = {
      header: ["Line 1", "identifies the file and the project it holds"],
      document: [
        "Every other line",
        "one document: a template, a passage, or a sentence",
      ],
    };
    return (schema.oneOf || []).map((entry) => {
      const key = entry.$ref.split("/").pop();
      const [title, blurb] = titles[key] || [key, ""];
      return { key, title, blurb, node: entry };
    });
  }, []);

  const [mode, setMode] = useState(null);
  const [nonce, setNonce] = useState(0);
  // Remounting the tree is what makes expand/collapse-all authoritative:
  // rows that a visitor toggled by hand start over from the new default.
  const setAll = useCallback((value) => {
    setMode(value);
    setNonce((n) => n + 1);
  }, []);

  return (
    <div className="schema-explorer">
      <div className="schema-toolbar">
        <span className="schema-toolbar-title">{schema.title}</span>
        <Chip color="grey">
          version {schema.$defs?.header?.properties?.version?.minimum}
        </Chip>
        <span className="schema-toolbar-spacer" />
        <button
          type="button"
          className="schema-toolbar-button"
          onClick={() => setAll(true)}
        >
          expand all
        </button>
        <button
          type="button"
          className="schema-toolbar-button"
          onClick={() => setAll(false)}
        >
          collapse all
        </button>
      </div>
      <div className="schema-legend">
        <Chip color="teal">object</Chip>
        <Chip color="blue">string</Chip>
        <Chip color="orange">number</Chip>
        <Chip color="purple">boolean</Chip>
        <Chip color="green">array</Chip>
        <Chip color="pink">exact value</Chip>
        <span className="schema-required">required</span>
        <span className="schema-legend-hint">
          — everything else is optional; click a row to open it
        </span>
      </div>
      {roots.map((root) => (
        <div className="schema-root" key={root.key}>
          <div className="schema-root-header">
            <span className="schema-root-title">{root.title}</span>
            <span className="schema-root-blurb">{root.blurb}</span>
          </div>
          <SchemaNode
            key={nonce}
            name={root.key}
            node={root.node}
            depth={0}
            mode={mode}
            kind="root"
          />
        </div>
      ))}
      <p className="schema-footnote">
        Rendered from{" "}
        <a href="/schemas/tt-export-v2.json">
          <code>{schema.$id}</code>
        </a>
        , the schema itself.
      </p>
    </div>
  );
}
