#!/usr/bin/env sh
cd "$(dirname "$0")" || exit 1
echo 'CRA Readiness Studio at http://127.0.0.1:8765'
exec python3 -m http.server 8765 --bind 127.0.0.1
