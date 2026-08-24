"""Read Twisted Tongues project exports (tt_export v2) with the stdlib only.

A tt_export file is UTF-8 ndjson: one header line, then one document per
line, labelled with its collection (meta / passages / sentences). This
module is a small, dependency-free reader for people who want to process
their own linguistic data outside the app::

    import tt_export

    export = tt_export.load('My Project.json')
    print(export.header.name, len(export.passages), 'passages')
    for passage in export.passages:
        print(passage.data['name'])
        for sentence in export.sentences_for(passage):
            for word in sentence.data.get('words', []):
                print('  ', word)

Each document line carries two views: `doc`, the schema-defined external
document this reader returns (its `data` has track values keyed by plain
track name, T2IPA converted to display form, every string NFD-normalized),
and `internal`, the app's own state — deliberately unspecified, exposed
only as an untouched dict for completeness.

Per the format's stability posture (docs/design/save-load-snapshot.md),
this reader ignores lines and fields it does not recognize, and does not
gate on the header version beyond checking the doctype — additive format
changes must not break it.

Files written before tt_export existed (first line ``{"v":1,...}``) are a
different, CouchDB-specific format; load them into the app with
"Load from File..." and re-export to convert.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field, replace
from pathlib import Path
from typing import IO, Iterator, Optional, Union

DOCTYPE = 'tt_export'
COLLECTIONS = ('meta', 'passages', 'sentences')


class TTExportError(ValueError):
    """The file is not a readable tt_export file."""


@dataclass(frozen=True)
class Header:
    name: str
    description: str
    version: int
    exported_at: Optional[float] = None


@dataclass(frozen=True)
class ImportedMarker:
    at: float
    by: str
    rev: Optional[str] = None


@dataclass(frozen=True)
class Doc:
    id: str
    data: dict
    rev: Optional[str] = None
    created_date: Optional[float] = None
    modified_date: Optional[float] = None
    creator: Optional[str] = None
    modifier: Optional[str] = None
    imported: Optional[ImportedMarker] = None
    #: The app's internal document state, verbatim. Deliberately
    #: unspecified: its shape may change without a version bump, and
    #: nothing outside the app may depend on it. Everything readable is
    #: in `data`.
    internal: Optional[dict] = None


@dataclass(frozen=True)
class Export:
    header: Header
    meta: list[Doc] = field(default_factory=list)
    passages: list[Doc] = field(default_factory=list)
    sentences: list[Doc] = field(default_factory=list)

    def sentences_for(self, passage: Union[Doc, str]) -> list[Doc]:
        """The sentences of one passage, in id (entry) order.

        Sentence ids are the passage id followed by '-' and a counter,
        which is the format's one structural invariant across collections.
        """
        passage_id = passage.id if isinstance(passage, Doc) else passage
        prefix = passage_id + '-'
        return [s for s in self.sentences if s.id.startswith(prefix)]

    def templates(self) -> list[Doc]:
        """The track templates among the meta documents."""
        return [d for d in self.meta if d.id.startswith('template_')]


def _parse_doc(raw: dict) -> Optional[Doc]:
    doc_id = raw.get('id')
    data = raw.get('data')
    if not isinstance(doc_id, str) or not isinstance(data, dict):
        return None
    imported = None
    raw_imported = raw.get('imported')
    if isinstance(raw_imported, dict) and \
            isinstance(raw_imported.get('at'), (int, float)) and \
            isinstance(raw_imported.get('by'), str):
        rev = raw_imported.get('rev')
        imported = ImportedMarker(
            at=float(raw_imported['at']), by=raw_imported['by'],
            rev=rev if isinstance(rev, str) else None)

    def _opt_str(key: str) -> Optional[str]:
        value = raw.get(key)
        return value if isinstance(value, str) else None

    def _opt_num(key: str) -> Optional[float]:
        value = raw.get(key)
        return float(value) if isinstance(value, (int, float)) else None

    return Doc(id=doc_id, data=data, rev=_opt_str('rev'),
               created_date=_opt_num('created_date'),
               modified_date=_opt_num('modified_date'),
               creator=_opt_str('creator'), modifier=_opt_str('modifier'),
               imported=imported)


def _lines(text: str) -> Iterator[str]:
    for line in text.lstrip('﻿').splitlines():
        line = line.strip()
        if line:
            yield line


def loads(text: str) -> Export:
    """Parse tt_export file contents. Raises TTExportError otherwise."""
    lines = _lines(text)
    try:
        first = next(lines)
    except StopIteration:
        raise TTExportError('empty file')
    try:
        head = json.loads(first)
    except json.JSONDecodeError:
        raise TTExportError('not a tt_export file')
    if not isinstance(head, dict) or head.get('doctype') != DOCTYPE:
        if isinstance(head, dict) and head.get('v') == 1:
            raise TTExportError(
                'this is a legacy (pre-tt_export) project file; load it '
                'into the app with "Load from File..." and re-export it')
        raise TTExportError('not a tt_export file')

    header = Header(
        name=head.get('name', '') if isinstance(head.get('name'), str) else '',
        description=head.get('description', '')
        if isinstance(head.get('description'), str) else '',
        version=head.get('version')
        if isinstance(head.get('version'), int) else 0,
        exported_at=float(head['exported_at'])
        if isinstance(head.get('exported_at'), (int, float)) else None)

    collections: dict[str, list[Doc]] = {c: [] for c in COLLECTIONS}
    for lineno, line in enumerate(lines, start=2):
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            raise TTExportError(f'line {lineno}: not valid JSON')
        if not isinstance(obj, dict):
            continue
        collection = obj.get('collection')
        if collection not in COLLECTIONS:
            continue  # a collection from a newer format: not ours to read
        doc = _parse_doc(obj.get('doc') or {})
        if doc is not None:
            internal = obj.get('internal')
            if isinstance(internal, dict):
                doc = replace(doc, internal=internal)
            collections[collection].append(doc)

    return Export(header=header, meta=collections['meta'],
                  passages=collections['passages'],
                  sentences=collections['sentences'])


def load(source: Union[str, Path, IO[str]]) -> Export:
    """Parse a tt_export file from a path or an open text file."""
    if hasattr(source, 'read'):
        return loads(source.read())
    return loads(Path(source).read_text(encoding='utf-8'))
