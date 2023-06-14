import mongoose from 'mongoose';
import config from './src/config';
import { init } from './src/app';

mongoose
  .connect(config.MONGO_URL || '')
  .then(() => {
    console.log('connected to MongoDB');
    init();
  })
  .catch((error: unknown) => {
    const msg = 'error connection to MongoDB';
    if (error instanceof Error) {
      console.log(msg, error.message);
    } else {
      console.log(msg);
    }
  });
