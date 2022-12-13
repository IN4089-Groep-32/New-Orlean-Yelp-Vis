#!/usr/bin/env bash

# abort on errors
set -e

# build
npm run publish

# navigate into the build output directory
cd publish
cd build
rm .gitignore
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:IN4089-Groep-32/in4089-groep-32.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -