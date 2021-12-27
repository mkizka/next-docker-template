#!/bin/sh

yarn prisma migrate deploy
if [ -n "$PORT" ]; then
  yarn start -p $PORT
else
  # devDependenciesのインストール
  yarn install
  yarn dev
fi
