## If you write your own reader {#rules}

Four rules:

1. **Read `doc`, never `internal`.** The `internal` half of a document line
   carries no promises.
2. **Ignore lines and fields you do not recognize.** Fields may be added
   without a version bump, and a future release may add a collection that
   does not exist today. Skipping the unfamiliar is what makes a reader
   survive them. A change that would break a reader that does this — a field
   removed, or one whose meaning changes — comes with a higher `version`
   number, which is on the first line of every file.
3. **Treat `rev` (and `imported.rev`) as opaque tokens.** They can be
   compared for equality and nothing else — no ordering, no structure, no
   meaning outside the database they came from.
4. **Treat `creator` and `modifier` as approximate, unverified provenance.**
   They are opaque ids, useful for telling two contributors apart and for
   knowing roughly who to ask about a strange entry. They are not identity
   anyone vouches for — a file can be edited by anybody who has it.

## Older files {#older}

Files whose first line begins `{"v":1,` were written by an earlier version of
TT, before this format existed. They are a different thing — a database
replication dump — and they do not follow anything on this page. TT still
loads them, and re-saving the loaded project converts it to the current
format. Note that those older files did not include templates, so templates
cannot be recovered from one.

## Schema reference {#schema}

Everything a file may contain, from the schema itself:
