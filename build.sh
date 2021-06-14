#!/usr/bin/env bash

set -e

db_pass=
db_user=
db_name=
port=
secret=
next_api_endpoint=

while [[ -n "$1" ]]; do
    case "$1" in
    --db-pass)
        shift
        db_pass="$1"
        ;;
    --db-user)
        shift
        db_user="$1"
        ;;
    --db-name)
        shift
        db_name="$1"
        ;;
    --port)
        shift
        port="$1"
        ;;
    --secret)
        shift
        secret="$1"
        ;;
    --next-api-endpoint)
        shift
        next_api_endpoint="$1"
        ;;
    esac
    shift
done

all_args=(
    "$db_pass"
    "$db_user"
    "$db_name"
    "$port"
    "$secret"
    "$next_api_endpoint"
)

for arg in "${all_args[@]}"; do
    if [[ -z "$arg" ]]; then
        echo "Invalid options..." 1>&2
        exit 1
    fi
done

export POSTGRES_PASSWORD="$db_pass"
export POSTGRES_USER="$db_user"
export POSTGRES_DB="$db_name"

export DATABASE_USER="$db_user"
export DATABASE_PASSWORD="$db_pass"
export DATABASE_NAME="$db_name"

export PORT="$port"
export SECRET="$secret"
export NEXT_PUBLIC_API_ENDPOINT="$next_api_endpoint"

docker-compose build
docker-compose up -d
