FROM node:18.16.0-bullseye-slim

ARG APP_PATH=/usr/src/app

RUN apt-get update
RUN apt-get install -y dumb-init

RUN mkdir $APP_PATH && chown -R node:node $APP_PATH

WORKDIR $APP_PATH

USER node

COPY --chown=node:node . .

RUN npm install

CMD ["dumb-init", "node", "node_modules/ts-node-dev/lib/bin.js", "index.ts"]



