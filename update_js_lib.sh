#!/bin/bash

BASE=public/bower_components/
DEST=public/js/lib
cp $BASE/angular/angular.min.js $DEST
cp $BASE/angular-resource/angular-resource.min.js $DEST
cp $BASE/angular-sanitize/angular-sanitize.min.js $DEST
cp $BASE/angular-translate/angular-translate.min.js $DEST
cp $BASE/angular-ui-router/release/angular-ui-router.min.js $DEST
cp $BASE/bootstrap/dist/{js/bootstrap.min.js,css/bootstrap.min.css} $DEST
cp $BASE/font-awesome/css/font-awesome.min.css $DEST
cp $BASE/jquery/dist/jquery.min.js $DEST
