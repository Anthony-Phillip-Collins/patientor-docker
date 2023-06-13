FROM node:18.16.0-bullseye-slim as base

ARG APP_PATH=/usr/src/app

RUN apt-get update
RUN apt-get install -y dumb-init

RUN mkdir $APP_PATH && chown -R node:node $APP_PATH
WORKDIR $APP_PATH

FROM base as build
USER node
COPY --chown=node:node . .
RUN npm install
RUN node node_modules/typescript/bin/tsc

FROM base as production
USER node
COPY --from=build --chown=node:node $APP_PATH/build $APP_PATH/build
COPY --chown=node:node ./package.json ./package-lock.json $APP_PATH
RUN npm ci --only=production

CMD ["dumb-init", "node", "build/index.js"]



