# Report export

The supported export format is JSON. The public handler returns content type `application/json` and a body with `record_count`.

XML export was retired. `legacy-xml.js` is a private helper, not a public package API. The only remaining caller is its old test. There is no requirement to support XML or to return a special response for a format option.
