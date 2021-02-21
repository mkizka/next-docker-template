#!/bin/sh

yarn prisma migrate deploy --preview-feature
if [ -n "$PORT" ]; then
  yarn start -p $PORT
else
  # devDependenciesのインストール
  yarn install
  yarn dev
fi
