#!/bin/sh
set -e

if [[ -z "${CLOUD_API_BASE_URL}" ]]; then
  CLOUD_API_BASE_URL="%%CLOUD_API_BASE_URL%%"
fi

if [[ -z "${ARCHITECT}" ]]; then
  ARCHITECT="%%ARCHITECT%%"
fi

if [[ -z "${ARCHITECT_CURRENT_SERVICE}" ]]; then
  ARCHITECT_CURRENT_SERVICE="%%ARCHITECT_CURRENT_SERVICE%%"
fi

find /usr/src/app/.nuxt/ -type f -name '*.js' \
  -exec sed -i "s+%%CLOUD_API_BASE_URL%%+${CLOUD_API_BASE_URL:?}+g" '{}' \; \
  -exec sed -i "s+%%ARCHITECT%%+${ARCHITECT:?}+g" '{}' \; \
  -exec sed -i "s+%%ARCHITECT_CURRENT_SERVICE%%+${ARCHITECT_CURRENT_SERVICE:?}+g" '{}' \; \

exec "$@"
