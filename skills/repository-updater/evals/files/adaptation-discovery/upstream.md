# Docforge upstream captures

These are complete local captures for the fictional Docforge tool. The released versions after 2.8.0 through 3.0.0 are 3.0.0 only.

## Release 3.0.0

Source: <https://docforge.example/releases/3.0.0>

- Add `render-set` to render several documentation targets in one process. It shares the Markdown parser and theme setup between targets.
- Add an SVG diagram renderer. Diagram blocks use the new `diagram` fence; ordinary Markdown output is unchanged.
- Remove the legacy JavaScript extension loader. Extensions now use the isolated extension protocol.

The existing `render` command and its arguments remain supported. Both rendering commands write the same HTML for the same source and settings.

## Rendering guide for 3.0.0

Source: <https://docforge.example/docs/3.0/rendering>

`docforge render SOURCE --output OUTPUT --language LANGUAGE` starts one renderer process. Each process parses the source and loads its theme. It exits with status 1 on a failed target.

`docforge render-set TARGETS_JSON --fail-fast` reads an array of targets. Each target has `source`, `output`, and `language` fields. The command shares parser results for identical sources and processes targets in array order. Each target keeps its own output directory and language. `--fail-fast` stops on the first failed target with status 1, like a shell script using `set -e`. Without this flag, all targets run and the command returns status 1 if any failed.

A migration from separate commands needs a target manifest and a change to the calling build script. There is no cross-process or persistent cache. For one target, both commands do the same parsing and rendering work.

The SVG renderer is useful for documents containing diagram blocks. It does not change plain Markdown rendering. Projects with no custom extensions need no extension migration.
