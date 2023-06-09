import express from 'express';
import cors from 'cors';
import config from './src/config';
import { diagnosesRouter } from './src/routes/diagnoses';
import { patientsRouter } from './src/routes/patients';
import mongoose from 'mongoose';

const init = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use('/api/diagnoses', diagnosesRouter);
  app.use('/api/patients', patientsRouter);

  app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
  });

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

mongoose
  .connect(config.MONGO_URL || '')
  .then(() => {
    console.log('connected to MongoDB');
    init();
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });
