#!/usr/bin/env sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

cd "$REPO_ROOT"

if ! command -v skill-validator >/dev/null 2>&1; then
  cat <<'EOF' >&2
skill-validator is required to validate the skills in this repository.

Install it with one of:

  brew tap agent-ecosystem/tap
  brew install skill-validator

or

  go install github.com/agent-ecosystem/skill-validator/cmd/skill-validator@latest

Then rerun:

  pnpm run lint:skills
EOF
  exit 1
fi

skill-validator check --strict --allow-dirs=evals skills/
