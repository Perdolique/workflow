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

vpx skills add perdolique/workflow --global --skill '*' --agent universal --yes
vpx skills add microsoft/playwright-cli --global --skill playwright-cli --agent universal --yes
vpx skills add anthropics/skills --global --skill skill-creator --agent universal --yes

vp install -g @playwright/cli@latest
playwright-cli install-browser chromium

PLAYWRIGHT_CONFIG_DIR="$HOME/.playwright"
PLAYWRIGHT_CONFIG_FILE="$PLAYWRIGHT_CONFIG_DIR/cli.config.json"

if [ ! -e "$PLAYWRIGHT_CONFIG_FILE" ]; then
  mkdir -p "$PLAYWRIGHT_CONFIG_DIR"
  cat >"$PLAYWRIGHT_CONFIG_FILE" <<'EOF'
{
  "browser": {
    "browserName": "chromium",
    "launchOptions": {
      "channel": "chromium"
    }
  }
}
EOF
fi
