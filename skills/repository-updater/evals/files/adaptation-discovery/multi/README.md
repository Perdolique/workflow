# Product manuals

This repository builds English, German, and French editions from the same source tree. The locale selects the theme's built-in labels; all three editions use the same Markdown files. There are no diagrams or custom extensions.

`./build.sh` creates the three editions for deployment. Keep the existing output directories, languages, target order, and stop-on-first-error behavior. The publishing job uploads these directories unchanged. No release-time work is required from an external service.

The current Docforge pin is 2.8.0. The ordinary and zero-maturity discovery results both contain only Docforge 3.0.0. The update policy permits this target.

## Recent build profile

| Command | Parse and theme setup | HTML rendering |
| --- | --- | --- |
| English edition | 4.0 s | 0.7 s |
| German edition | 4.0 s | 0.7 s |
| French edition | 4.0 s | 0.7 s |

Each command runs in a new process and reads the same source files.
