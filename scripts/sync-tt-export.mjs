#!/usr/bin/env node
//
// Vendors the public description of the tt_export save format (JSON Schema,
// TypeScript types, Python reader) from the app repository into this site.
//
// The app repo (twisted-tongues-v2) is the source of truth: the files there
// are tested against the same byte-frozen goldens as the app's serializer, so
// this site must never be the place they get edited. This script copies them
// verbatim and records a sha256 of every copy in tt-export-sync.json, which
// makes two failure modes loud:
//
//   * someone hand-edits a vendored file here     -> `--check` fails anywhere
//   * the app repo moves ahead of this site       -> `--check` fails on any
//                                                    machine with a checkout
//
// Usage:
//   node scripts/sync-tt-export.mjs [--repo <path>]   copy from the app repo
//   node scripts/sync-tt-export.mjs --check [--repo <path>]
//
// The app checkout is found at --repo, then $TT_V2_REPO, then the default
// sibling path ../twisted-tongues-v2. `--check` without a checkout verifies
// the recorded hashes only, which is exactly what CI here can do -- and it
// runs on every deploy, so a drifted copy cannot ship quietly.
//
// In practice nobody has to remember to run this: the app repo's prerelease
// workflow clones this site, runs this script against itself, and pushes the
// result just before it asks for a release. That is the same code path as a
// hand-run sync, which is why it lives here rather than there.

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(SITE, "scripts", "tt-export-sync.json");
const DEFAULT_REPO = resolve(SITE, "..", "twisted-tongues-v2");
const UPSTREAM_DIR = "docs/tt_export";

// The schema is vendored at the path its own `$id` claims
// (https://twisted-tongues.com/schemas/tt-export-v2.json) so that the id
// resolves to the document it names; the other two sit next to each other
// under /tt-export/.
//
// The schema lands twice on purpose: public/ is what visitors download, and
// src/ is what the schema explorer imports at build time. Importing out of
// public/ works but Vite warns against it on every dev reload, and a
// build-time import is also what an SSR pass would need. Both copies come
// from the same upstream bytes and both are hashed below, so they cannot
// drift apart quietly.
const FILES = [
  { upstream: "tt-export.schema.json", local: "public/schemas/tt-export-v2.json" },
  { upstream: "tt-export.schema.json", local: "src/tt-export/tt-export.schema.json" },
  { upstream: "tt-export.d.ts", local: "public/tt-export/tt-export.d.ts" },
  { upstream: "tt_export.py", local: "public/tt-export/tt_export.py" },
];

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function parseArgs(argv) {
  const args = { check: false, repo: process.env.TT_V2_REPO || null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--check") args.check = true;
    else if (arg === "--repo") args.repo = argv[++i];
    else if (arg.startsWith("--repo=")) args.repo = arg.slice("--repo=".length);
    else if (arg === "--help" || arg === "-h") args.help = true;
    else die(`unknown argument: ${arg}`);
  }
  return args;
}

function die(message) {
  console.error(`sync-tt-export: ${message}`);
  process.exit(1);
}

// The app repo if we can see one, else null: every caller has something
// useful to do without it.
function findRepo(explicit) {
  const candidate = explicit ? resolve(explicit) : DEFAULT_REPO;
  if (!existsSync(join(candidate, UPSTREAM_DIR))) {
    if (explicit) die(`no ${UPSTREAM_DIR} under ${candidate}`);
    return null;
  }
  return candidate;
}

function describeRepo(repo) {
  try {
    const git = (...a) => execFileSync("git", a, { cwd: repo, encoding: "utf8" }).trim();
    return { commit: git("rev-parse", "HEAD"), dirty: git("status", "--porcelain", UPSTREAM_DIR) !== "" };
  } catch {
    return { commit: null, dirty: false };
  }
}

function readManifest() {
  if (!existsSync(MANIFEST)) die(`no manifest at ${MANIFEST}; run without --check first`);
  return JSON.parse(readFileSync(MANIFEST, "utf8"));
}

function sync(repo) {
  if (!repo) {
    die(
      `no app checkout found (looked for ${DEFAULT_REPO}). ` +
        "Pass --repo <path> or set TT_V2_REPO.",
    );
  }
  const { commit, dirty } = describeRepo(repo);
  if (dirty) {
    console.warn(`sync-tt-export: warning: ${UPSTREAM_DIR} has uncommitted changes in ${repo}`);
  }

  const files = FILES.map(({ upstream, local }) => {
    const source = readFileSync(join(repo, UPSTREAM_DIR, upstream));
    const target = join(SITE, local);
    const changed = !existsSync(target) || !readFileSync(target).equals(source);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, source);
    console.log(`${changed ? "updated" : "unchanged"}  ${local}`);
    return { upstream: `${UPSTREAM_DIR}/${upstream}`, local, sha256: sha256(source) };
  });

  const manifest = {
    _comment:
      "Generated by scripts/sync-tt-export.mjs. The files below are vendored " +
      "from the app repository -- edit them there, then re-run the sync.",
    upstream: {
      repo: "twisted-tongues-v2",
      commit,
      synced_at: new Date().toISOString().slice(0, 10),
    },
    files,
  };
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nsynced ${files.length} files from ${repo}${commit ? ` @ ${commit.slice(0, 12)}` : ""}`);
}

function check(repo) {
  const manifest = readManifest();
  const problems = [];

  for (const entry of manifest.files) {
    const target = join(SITE, entry.local);
    if (!existsSync(target)) {
      problems.push(`${entry.local}: missing`);
      continue;
    }
    if (sha256(readFileSync(target)) !== entry.sha256) {
      problems.push(`${entry.local}: edited here (does not match the recorded hash)`);
    }
  }
  console.log(`checked ${manifest.files.length} vendored files against the manifest`);

  if (repo) {
    for (const entry of manifest.files) {
      const source = join(repo, entry.upstream);
      if (!existsSync(source)) {
        problems.push(`${entry.upstream}: gone from the app repo (was it moved?)`);
        continue;
      }
      if (sha256(readFileSync(source)) !== entry.sha256) {
        problems.push(`${entry.local}: stale (the app repo's ${entry.upstream} has moved on)`);
      }
    }
    console.log(`compared them against ${repo}`);
  } else {
    console.log("no app checkout in sight -- skipped the upstream comparison");
  }

  if (problems.length) {
    console.error("\nsync-tt-export: out of sync:");
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error("\nFix by editing the files in the app repo, then: npm run tt-export:sync");
    process.exit(1);
  }
  console.log("\nin sync");
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n\n")[1].replace(/^\/\/ ?/gm, ""));
  process.exit(0);
}
const repo = findRepo(args.repo);
if (args.check) check(repo);
else sync(repo);
