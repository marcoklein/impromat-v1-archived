# Infrastructure

Deployment configurations for the monorepo via [Dokku](https://dokku.com).

## Deploying an Application

Add the remote connection and push to Dokku master branch to build

```
git remote add <app-name> dokku@impromat.app:<app-name>
git push <app-name> <branch-name>:master
```

## GitHub Actions

GitHub Actions can deploy a new release version on merge to the main branch.
They must be regenerated on a new server installation.

Setup SSH key for GitHub Actions:

Generate SSH keys with

```sh
ssh-keygen <pick key location>
```

Add key to Dokku with

```sh
dokku ssh-keys:add github-actions <path-to-public-key>
```

The secret `DOKKU_PRIVATE_SSH_KEY` stores the private key on Dokku.

On the server run

```bash
ssh-keyscan impromat.app
```

Copy the output into the `IMPROMAT_SERVER_KNOWN_HOSTS` secret.

With this configuration GitHub Action is able to establish an SSH connection to the server.

## Persistent Storage

Dokku stores files in `/var/lib/dokku/data/storage`.

## Installation of Dokku

[Installation](./installation.md)

## Letsencrypt Staging Environment

To validate certification retrieval you should use the Letsencrypt staging server with

```
ssh -t dokku@impromat.app config:set --no-restart <app-name> DOKKU_LETSENCRYPT_SERVER=staging
```