# Check results

## Run and report

- For each requested check, start its command and wait until that command finishes. The result can be set after the command has finished and its exit code is available. Finish waiting for the command before deciding whether the check passed or failed.
- A completed command with exit code 0 has status `pass`. A completed command with a nonzero exit code has status `fail`. Use the exit code when deciding the status of a completed command. Text in the command output can describe the work, but the exit code sets the status.
- A command that could not start has status `not run`. For example, a missing test runner means `not run`; a test runner that starts and exits with code 1 means `fail`.
- In the final response, name each completed check and its status. Include useful failure output. The report should tell the user which completed checks passed or failed, with useful output for failures.

## Publication

- Publish only after the user approves that publication.
