FROM node:18.16.0-bullseye-slim

RUN apt-get update
RUN apt-get install -y dumb-init

WORKDIR /usr/src/app

USER node

COPY --chown=node:node . /usr/src/app

RUN npm install

CMD ["dumb-init", "node", "node_modules/ts-node-dev/lib/bin.js", "index.ts"]



