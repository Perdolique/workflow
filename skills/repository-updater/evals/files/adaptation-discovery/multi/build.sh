#!/bin/sh
set -eu

docforge render docs --output site/en --language en
docforge render docs --output site/de --language de
docforge render docs --output site/fr --language fr
