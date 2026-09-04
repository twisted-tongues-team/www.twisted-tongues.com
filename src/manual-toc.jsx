import { useEffect, useState } from "react";

// The heading the reader is looking at: the last one whose top has scrolled
// past a line a little way down from the top of the viewport, the first one
// before any has, and the last one once the page is scrolled to the bottom
// (a short final section might otherwise never reach the line).
function useActiveHeading(headings) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    if (els.length === 0) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let current = els[0];
      if (atBottom) {
        current = els[els.length - 1];
      } else {
        for (const el of els) {
          if (el.getBoundingClientRect().top > 120) break;
          current = el;
        }
      }
      setActive(current.id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headings]);

  return active;
}

// Group the flat outline into chapters (level 2) with their subsections.
function chapters(headings) {
  const out = [];
  for (const h of headings) {
    if (h.level === 2 || out.length === 0) out.push({ ...h, children: [] });
    else out[out.length - 1].children.push(h);
  }
  return out;
}

function TocLink({ heading, active }) {
  const isActive = heading.id === active;
  return (
    <a
      href={`#${heading.id}`}
      className={`toc-link toc-l${heading.level}${isActive ? " toc-active" : ""}`}
      aria-current={isActive ? "location" : undefined}
    >
      <span className="toc-num">{heading.number}</span>
      <span className="toc-title">{heading.title}</span>
    </a>
  );
}

function TocList({ headings, active }) {
  return (
    <ol className="toc-list">
      {chapters(headings).map((ch) => {
        const open =
          ch.id === active || ch.children.some((h) => h.id === active);
        return (
          <li key={ch.id} className={`toc-chapter${open ? " toc-open" : ""}`}>
            <TocLink heading={ch} active={active} />
            {ch.children.length > 0 && (
              <ol className="toc-sub">
                {ch.children.map((h) => (
                  <li key={h.id}>
                    <TocLink heading={h} active={active} />
                  </li>
                ))}
              </ol>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// The manual's table of contents, rendered twice for the two layouts: a
// sticky column beside the text on wide screens, which follows the reader
// and shows only the open chapter's subsections; and a collapsed <details>
// above the text on narrow ones, which shows everything when opened. The
// stylesheet displays one or the other. Both are in the prerendered HTML,
// and without JavaScript the sidebar simply shows every section.
export function ManualToc({ headings, label }) {
  const active = useActiveHeading(headings);
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);

  return (
    <>
      <details className="toc-mobile">
        <summary>{label}</summary>
        <TocList headings={headings} active={active} />
      </details>
      <nav
        id="table-of-contents"
        className={`toc-aside${live ? " toc-live" : ""}`}
        aria-label={label}
      >
        <p className="toc-label">{label}</p>
        <TocList headings={headings} active={active} />
      </nav>
    </>
  );
}
