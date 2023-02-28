import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const port = 3000;

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

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});