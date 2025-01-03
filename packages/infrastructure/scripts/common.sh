#!/bin/bash

if [ ! -z $DEBUG_TRACE ]; then
  set -o xtrace
fi

function log {
  echo "$@" 1>&2
}

function debug_log {
  if [ ! -z "$DEBUG" ]
  then
    log DEBUG $@
  fi
}

function error() {
  echo "$@" 1>&2
}

function fail() {
  error "$@"
  exit 1
}

function dokku {
  if [ -z $DEBUG ]; then
    # ignore the "Connection to ... closed" error message
    ssh -t dokku@impromat.app $@ 2> /dev/null
  else
    ssh -t dokku@impromat.app $@
  fi
}

function ensureAppExists {
  local appName=$1

  log "Ensure Application Exists"
  set +e
  dokku apps:exists $appName
  if [ ! $? -eq 0 ]; then
    set -e
    log "Creating app $appName"
    dokku apps:create $appName
  fi
  set -e
}

function ensureNetworkExists {
  local networkName=$1

  log "Ensure Network Exists"
  set +e
  dokku network:exists $networkName
  if [ ! $? -eq 0 ]; then
    set -e
    log "Creating network $appName"
    dokku network:create $networkName
  fi
  set -e
}

function ensurePostgresDatabaseExists {
  local dbName=$1

  log "Ensure Postgres Database Exists"
  set +e
  dokku postgres:exists $dbName
  if [ ! $? -eq 0 ]; then
    set -e
    log "Creating database $dbName"
    dokku postgres:create $dbName
  fi
  set -e
}

function ensurePostgresDatabaseIsLinked {
  local dbName=$1
  local appName=$2

  log "Ensure Postgres is linked"
  set +e
  dokku postgres:linked $dbName $appName
  if [ ! $? -eq 0 ]; then
    set -e
    log "Linking database $dbName"
    dokku postgres:link $dbName $appName
  fi
  set -e
}

function configureDomain {
  local appName=$1
  local domains=$2

  log "Configure Domain '$domains'"
  set +e
  isDomainSet=$(dokku domains:report $appName --domains-app-vhosts | grep "$domains")
  log "isDomainSet=$isDomainSet"
  set -e
  if [ -z "$isDomainSet" ]; then
    log "Set Domain"
    dokku domains:set $appName $domains
  else
    log "Domain already set"
  fi

  if [ ! $(dokku letsencrypt:active $appName) ]; then
    log "Enabling Letsencrypt"
    dokku letsencrypt:enable $appName
  else
    log "Letsencrypt is active already"
  fi
}

