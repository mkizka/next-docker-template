# 参考：https://zenn.dev/kazumax4395/articles/427cc791f6145b
FROM node:16-slim AS base
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .

# Build
FROM base AS build
WORKDIR /build

COPY --from=base /app ./
RUN yarn build

# node_modules
FROM node:16-slim AS node_modules
WORKDIR /modules

COPY --from=base /app ./
RUN yarn install --non-interactive --frozen-lockfile --production

# Production
FROM node:16-slim
WORKDIR /app

# https://github.com/prisma/prisma/issues/4741#issuecomment-773214466
RUN apt update && apt install -y libssl-dev \
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock next.config.js start.sh ./
COPY --from=build /build/public ./public
COPY --from=build /build/.next ./.next
COPY --from=node_modules /modules/node_modules ./node_modules

RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]
