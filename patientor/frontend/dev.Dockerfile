FROM node:18.16.0-bullseye-slim AS base
WORKDIR /usr/src/app
COPY . .
RUN npm i
CMD ["npm", "start"]