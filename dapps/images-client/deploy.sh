#!/usr/bin/env sh
set -e
# build
REPO=$(git config --get remote.origin.url)
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f $REPO master:gh-pages
cd -