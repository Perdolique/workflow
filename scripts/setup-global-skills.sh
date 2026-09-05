#!/usr/bin/env sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

cd "$REPO_ROOT"

require_command() {
  if command -v "$1" >/dev/null 2>&1; then
    return
  fi

  printf '%s is required to set up global skills.\n' "$1" >&2
  exit 1
}

require_command vpx
require_command vp

exec vp node -- "$SCRIPT_DIR/setup-global-skills.ts" "$@"
