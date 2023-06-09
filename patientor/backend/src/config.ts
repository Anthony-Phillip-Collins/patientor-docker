import { config } from 'dotenv';

config();

let MONGO_URL = process.env.MONGO_URL || undefined;
let REDIS_URL = process.env.REDIS_URL || undefined;

const MONGO_USER = process.env.MONGO_USER || undefined;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || undefined;
const MONGO_HOST = process.env.MONGO_HOST || undefined;
const MONGO_PORT = process.env.MONGO_PORT || undefined;
const MONGO_DB = process.env.MONGO_DB || undefined;

const REDIS_HOST = process.env.REDIS_HOST || undefined;
const REDIS_PORT = process.env.REDIS_PORT || undefined;

if (!MONGO_URL && MONGO_USER && MONGO_PASSWORD && MONGO_HOST && MONGO_PORT && MONGO_DB) {
  MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
}

if (!REDIS_URL && REDIS_HOST && REDIS_PORT) {
  REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;
}

export default {
  PORT: process.env.PORT || 4000,
  MONGO_URL,
  REDIS_URL,
};
