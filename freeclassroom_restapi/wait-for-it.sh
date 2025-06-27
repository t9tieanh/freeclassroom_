#!/bin/sh

host="$1"
port="$2"
shift 2

if [ "$1" = "--" ]; then
  shift
fi

echo "$(date '+%Y-%m-%d %H:%M:%S') Waiting for $host:$port..."

while ! nc -z "$host" "$port"; do
  sleep 1
done

echo "$(date '+%Y-%m-%d %H:%M:%S') $host:$port is available"

exec "$@"
