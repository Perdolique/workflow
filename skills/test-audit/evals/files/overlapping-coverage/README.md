# Record lookup

`normalizeId` is an internal helper. It accepts strings, trims surrounding whitespace, and converts letters to lowercase. A whitespace-only ID becomes `null`.

`getRecord` is the public API adapter. It uses the normalized ID to find a record. A match returns status `200` and the exact response key `record_id`. A missing or empty ID returns status `404` and `{ error: 'not_found' }`.
