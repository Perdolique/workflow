# Runtime configuration

This fixture is an offline repository with one directly pinned runtime. Its version is stored in `runtime.json`. It has no dependency installer or transitive dependencies.

Generate declarations with `python3 runtime_tool.py generate`. The required repository check is `python3 runtime_tool.py check`. The generated file is the exact output of the generator; the check verifies that it matches the current configuration. There are no other configured checks.

## Saved update state

The user requested the runtime update from 4.0.0 to 4.1.0. Discovery and release research are complete. The ordinary and zero-maturity results match. Analysis selected removing `node_compat` as a low-risk adaptation because 4.1.0 enables the same behavior by default. The version and flag edits have been made and declarations regenerated.

The last executor then ran an extra `git diff --check`. It reported a trailing space on the generated file's first line. Work stopped before the required check and final response.

## Upstream notes

Source: <https://example-runtime.example/releases/4.1.0>

Runtime 4.1.0 enables Node compatibility by default. The old `node_compat` flag is accepted and ignored. Removing it simplifies the configuration without changing behavior. The declaration generator writes a space before the joined flag list; when the list is empty, the comment ends with a space. This does not affect declaration semantics or runtime behavior.
