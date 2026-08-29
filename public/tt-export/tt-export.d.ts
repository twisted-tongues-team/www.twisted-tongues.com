/**
 * TypeScript types for the Twisted Tongues project export format
 * ("tt_export", version 2).
 *
 * A file is UTF-8 ndjson: the first non-empty line is a {@link TTExportHeader},
 * every other non-empty line is a {@link TTExportDocumentLine}. Readers should
 * ignore lines and fields they do not recognize — fields may be added without
 * a version bump. See tt-export.schema.json for the authoritative constraints
 * and docs/design/save-load-snapshot.md for the design.
 */

/** First non-empty line of the file. */
export interface TTExportHeader {
  doctype: 'tt_export';
  /** Integer format version; 2 is current. */
  version: number;
  /** Project name. */
  name: string;
  /** Project description. */
  description: string;
  /** Seconds since the Unix epoch, at export time. */
  exported_at?: number;
  /**
   * The project this file came from. Written by a server export; a file the
   * browser wrote has no id to give.
   */
  project_id?: string;
  /**
   * An opaque cursor for the moment this snapshot was read. Hand it back to a
   * change feed and nothing between the two is missed. Server exports only.
   */
  update_seq?: string;
}

/**
 * meta holds project-level documents such as track templates; passages and
 * sentences hold the linguistic data.
 */
export type TTCollection = 'meta' | 'passages' | 'sentences';

/**
 * An opaque revision token from the backing database, comparable for
 * equality only — it carries no ordering or structure.
 */
export type TTRev = string;

/** Present on documents that arrived in their project via a file import. */
export interface TTImportedMarker {
  /** Import time, seconds since the Unix epoch. */
  at: number;
  /** Opaque user id of the importer. */
  by: string;
  /** Revision of the doc in the database it was imported from. */
  rev?: TTRev;
}

/**
 * As shown in the app's template UI. T2IPA tracks are entered as TIPA
 * notation and displayed as IPA; in this external view their values are
 * already the display form, so most readers never need this field.
 */
export type TTTrackType = 'Text' | 'T2IPA';

export interface TTWordTrackConfig {
  name: string;
  type: TTTrackType;
}

export interface TTSentenceTrackConfig {
  name: string;
}

/** `data` of a passage document. */
export interface TTPassageData {
  name?: string;
  description?: string;
  word_tracks?: TTWordTrackConfig[];
  sentence_tracks?: TTSentenceTrackConfig[];
  /**
   * Id of the meta template this passage was created from — the join key
   * to the meta collection's template documents.
   */
  track_template?: string;
}

/** `data` of a sentence document. */
export interface TTSentenceData {
  /** One object per word: track name → NFD display value. */
  words: Array<Record<string, unknown>>;
  /**
   * Sentence-level track values, keyed by track name — e.g. this
   * sentence's English translation and its French translation.
   */
  sentences: Record<string, unknown>;
  /** The grammaticality judgment for this sentence. */
  grammatical?: boolean;
  /** The felicity judgment for this sentence. */
  infelicitous?: boolean;
}

/**
 * `data` of a meta document. Track templates carry kind/name/tracks; a
 * meta document of no known kind exports an empty data shell (its content
 * is in `internal` only).
 */
export interface TTMetaData {
  kind?: 'template';
  name?: string;
  tracks?: {
    word_tracks?: TTWordTrackConfig[];
    sentence_tracks?: TTSentenceTrackConfig[];
  };
}

/** The external document. Everything meant for reading lives here. */
export interface TTExportDocument {
  /**
   * Unique within its collection. A sentence's id is its passage's id
   * followed by '-' and a 10-digit counter.
   */
  id: string;
  /** Revision of the source database at export time. */
  rev?: TTRev;
  /** Seconds since the Unix epoch. */
  created_date?: number;
  /** Seconds since the Unix epoch. */
  modified_date?: number;
  /**
   * Opaque user id: unverified approximate provenance, not identity the
   * system vouches for (a file can be edited by anyone).
   */
  creator?: string;
  /** Opaque user id; see creator. */
  modifier?: string;
  imported?: TTImportedMarker;
  /**
   * The external view of the payload: every string NFD-normalized. Shape
   * per collection: {@link TTPassageData}, {@link TTSentenceData},
   * {@link TTMetaData}.
   */
  data: TTPassageData | TTSentenceData | TTMetaData;
}

/** Every non-header line of the file. */
export interface TTExportDocumentLine {
  collection: TTCollection;
  /** The schema-defined external document — read this. */
  doc: TTExportDocument;
  /**
   * The app's own document state, 1:1 with its database, and the only
   * thing the app reads on import. Deliberately UNSPECIFIED: it may
   * change without a version bump and may drift toward `doc` over time.
   * Nothing outside the app may depend on it.
   */
  internal: Record<string, unknown>;
}

/** Any parsed line of a tt_export file. */
/**
 * The last line of a signed file, vouching for every byte above it.
 *
 * Written by a server that holds a signing key. A file the browser wrote has
 * none, and an unsigned file is perfectly valid — so the absence of this line
 * is not evidence of anything. Verifying needs only the public key `kid`
 * names.
 */
export interface TTExportSignature {
  doctype: 'tt_export_sig';
  /**
   * The construction. `Ed25519-SHA256` means: SHA-256 over every byte above
   * this line, then Ed25519 over the canonical JSON of
   * `{alg, kid, project_id, exported_at, sha256}` prefixed with
   * `tt_export_sig.v1\n`. The claims are signed with the digest, so `alg` and
   * `kid` cannot be rewritten on a file that still verifies.
   */
  alg: string;
  /** Which public key verifies this, so keys rotate without orphaning files. */
  kid: string;
  project_id?: string;
  /** Seconds since the Unix epoch — the same value the header carries. */
  exported_at?: number;
  /** Lowercase hex SHA-256 of every byte above this line. */
  sha256: string;
  /** base64url, unpadded, of the Ed25519 signature. */
  sig: string;
}

export type TTExportLine = TTExportHeader | TTExportDocumentLine | TTExportSignature;
