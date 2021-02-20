FROM node:14-slim

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
