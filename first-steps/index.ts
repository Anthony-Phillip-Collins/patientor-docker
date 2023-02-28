import express from 'express';
import bp from 'body-parser';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises, IExerciseInput } from './exerciseCalculator';

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const port = 3002;

app.get('/', (_req, res) => {
  res.redirect('/hello');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const bmi = calculateBmi(Number(height), Number(weight));

  if (bmi.error) {
    return res.status(400).send(bmi.error);
  }

  return res.status(200).json(bmi);
});

app.post('/exercises', (req, res) => {
  const data = req.body as IExerciseInput;
  const result = calculateExercises(data.daily_exercises, data.target);

  if (result.error) {
    return res.status(400).send(result.error);
  }

  return res.status(200).json(result);
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
