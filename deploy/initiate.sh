#!/bin/sh
set -e

### Configuration ###

SERVER=luca@new.sfcoding.com
APP_DIR=/var/www/lucarin-site
REMOTE_SCRIPT_PATH=/tmp/deploy-lucarin.sh

### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}


### Automation steps ###

run scp deploy/work.sh $SERVER:$REMOTE_SCRIPT_PATH
echo
echo "---- Running deployment script on remote server ----"
run ssh $SERVER sh $REMOTE_SCRIPT_PATH $APP_DIR
