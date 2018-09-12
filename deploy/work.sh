#!/bin/sh
set -e

### Configuration ###

APP_DIR=$1
GIT_URL=https://github.com/lucarin91/lucarin.git
RESTART_ARGS=

### Automation steps ###

set -x

# Pull latest code
if [ -e $APP_DIR ]; then
  cd $APP_DIR
  git pull
else
  git clone $GIT_URL $APP_DIR
  cd $APP_DIR
fi

# Install dependencies
npm install

# Restart app
passenger-config restart-app --ignore-app-not-running --ignore-passenger-not-running $RESTART_ARGS $APP_DIR
