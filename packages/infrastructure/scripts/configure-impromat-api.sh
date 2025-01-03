#!/usr/bin/env bash

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/common.sh

environmentName=$1
domain="$2"

appPrefix=impromat-api
appName=$appPrefix-$environmentName
echo "appPrefix=$appPrefix"
echo "appName=$appName"
echo "domain=$domain"

ensureAppExists $appName
configureDomain $appName $domain

dbName="impromat-db-$environmentName"
ensurePostgresDatabaseExists $dbName
ensurePostgresDatabaseIsLinked $dbName $appName

dokku network:set impromat-api-$environmentName attach-post-create ollama-bridge-$environmentName

log "Ensure Storage"
dokku storage:ensure-directory impromat-api-store-$environmentName
dokku storage:ensure-directory impromat-api-secrets-$environmentName
set +e
dokku storage:mount impromat-api-$environmentName /var/lib/dokku/data/storage/impromat-api-store-$environmentName:/mnt/storage
dokku storage:mount impromat-api-$environmentName /var/lib/dokku/data/storage/impromat-api-secrets-$environmentName:/mnt/secrets
set -e

log "Set App Configuration"
dokku config:set --no-restart impromat-api-$environmentName GOOGLE_AUTH_JSON_PATH=/mnt/secrets/google_key.secret.json
dokku config:set --no-restart impromat-api-$environmentName STORAGE_PATH=/mnt/storage
dokku config:set --no-restart impromat-api-$environmentName OLLAMA_ENDPOINT=http://ollama-$environmentName.web:11434
