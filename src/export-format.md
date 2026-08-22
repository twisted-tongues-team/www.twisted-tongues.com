Every project saved with “Save to Computer…” is a **`tt_export` file**: one
plain-text file holding the whole project — passages, sentences and
templates. This page describes what is in that file, what will not
change about it, and how to read it with your own tools.

## What is in the file {#anatomy}

A saved project is [ndjson](https://github.com/ndjson/ndjson-spec): UTF-8
text, one JSON object per line, with no brackets or commas holding the whole
file together. Read it one line at a time — each line stands on its own, so
a large project can be streamed rather than loaded whole.

The first line names the project. Every line after it is one document,
labelled with the collection it belongs to: a template (`meta`), a passage,
or a sentence.

```json
{"doctype":"tt_export","version":2,"name":"Florble","description":"Fieldwork, spring","exported_at":1787350000.0}
{"collection":"meta","doc":{"id":"template_1787253162080_Default template","data":{"kind":"template","name":"Default template","tracks":{"word_tracks":[{"name":"IPA","type":"T2IPA"},{"name":"Gloss","type":"Text"}],"sentence_tracks":[{"name":"Translation"}]}}},"internal":{"…":"…"}}
{"collection":"passages","doc":{"id":"nY1oxUoyOi9dxjF","data":{"name":"P1","word_tracks":[{"name":"IPA","type":"T2IPA"},{"name":"Gloss","type":"Text"}],"sentence_tracks":[{"name":"Translation"}],"track_template":"template_1787253162080_Default template"}},"internal":{"…":"…"}}
{"collection":"sentences","doc":{"id":"nY1oxUoyOi9dxjF-0000000000","data":{"words":[{"IPA":"ɲɔnwɔ","Gloss":"dog"}],"sentences":{"Translation":"the dog"},"grammatical":true}},"internal":{"…":"…"}}
```

Two things about that shape matter most:

**Read `doc`; ignore `internal`.** Every document line carries both. `doc` is
the external view — the one this page describes and the schema constrains.
`internal` is the app's own working state, kept in the file so that loading
the project back restores it exactly as it was. It is deliberately
undocumented, it may change shape at any time without the version changing,
and nothing outside the app should read it.

**A sentence knows its passage by its id.** A sentence's `id` is its
passage's `id`, then a hyphen, then a counter — `nY1oxUoyOi9dxjF-0000000000`
belongs to passage `nY1oxUoyOi9dxjF`. That prefix is the one link between
collections, and it is stable.

### Inside `doc.data` {#data}

`data` holds the linguistic content, arranged for reading rather than for
the app's convenience:

- **Word tracks are keyed by track name.** `words` is one object per word:
  `{"IPA": "ɲɔnwɔ", "Gloss": "dog"}`. Sentence-level tracks work the same
  way, in `sentences`.
- **T2IPA tracks are already IPA.** A track entered in tipa notation (see
  [section 4.4 of the manual](/manual#4.4-t2ipa-entry)) appears in the file
  as the rendered
  IPA — `ɲɔnwɔ`, not `\textltailn On^{w}O`.
- **Judgments are plain booleans**: `grammatical` and `infelicitous`, matching
  the checkboxes in the app.
- **A passage carries its own track configuration** in `word_tracks` and
  `sentence_tracks`, plus `track_template`: the id of the template it was
  created from, which is how you join a passage back to the `meta` collection.
- **Every string is NFD-normalized Unicode**, so a character and its
  combining marks are written the same way no matter which keyboard typed
  them. This matters the moment you compare or sort strings: normalize your
  search terms the same way before comparing
  (`unicodedata.normalize('NFD', s)` in Python, `s.normalize('NFD')` in
  JavaScript).

## Examples {#examples}

`jq` recipes, to copy or adapt. `IPA` and `Translation` are track names
from the example above — substitute the ones your project uses:

```sh
# every IPA line in the project, one sentence per line
jq -r 'select(.collection=="sentences") | [.doc.data.words[].IPA] | join(" ")' 'My Project.json'

# sentences with their translations, as TSV for a spreadsheet
jq -r 'select(.collection=="sentences") | [([.doc.data.words[].IPA] | join(" ")), .doc.data.sentences.Translation] | @tsv' 'My Project.json' > sentences.tsv

# the passages, with the id each sentence id is prefixed by
jq -r 'select(.collection=="passages") | [.doc.id, .doc.data.name] | @tsv' 'My Project.json'
```

The same walk with the Python reader below:

```python
import tt_export

export = tt_export.load('My Project.json')
print(export.header.name, len(export.passages), 'passages')

for passage in export.passages:
    print(passage.data['name'])
    for sentence in export.sentences_for(passage):
        words = [w.get('IPA', '') for w in sentence.data.get('words', [])]
        print('   ', ' '.join(words), '--', sentence.data['sentences'].get('Translation', ''))
```
