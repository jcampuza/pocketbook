#!/bin/sh

printf "Building build directory"
yarn build

printf "zipping build into build.zip"
zip -r build.zip build
