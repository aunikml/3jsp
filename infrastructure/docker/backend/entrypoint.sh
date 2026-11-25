#!/bin/sh
set -e

echo "Running backend entrypoint..."

# Wait for PostgreSQL if configured
if [ -n "$DB_HOST" ] && [ "$USE_SQLITE_FALLBACK" != "True" ] && [ "$USE_SQLITE_FALLBACK" != "true" ]; then
  echo "Waiting for PostgreSQL database at $DB_HOST:${DB_PORT:-5432}..."
  while ! nc -z "$DB_HOST" "${DB_PORT:-5432}"; do
    sleep 0.5
  done
  echo "PostgreSQL is ready!"
fi

echo "Applying database migrations..."
python manage.py migrate --noinput

exec "$@"
