import {  calculateBmi, IBmiArguments, parseArgumentsBmi } from "./bmiCalculator";

try {
  const { height, weight }: IBmiArguments = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight), '\n');
} catch (error: unknown) {
  let errorMessage = 'Something went wrong!';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage, '\n');
}
