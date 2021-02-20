FROM node:14-slim

# https://github.com/prisma/prisma/issues/4741#issuecomment-773214466
RUN apt update && apt install -y libssl-dev

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn

COPY . /app/
RUN yarn build

RUN yarn --production
RUN yarn cache clean

RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]
