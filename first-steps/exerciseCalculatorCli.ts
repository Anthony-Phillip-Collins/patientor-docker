import { calculateExercises, parseArgumentsExercise } from "./exerciseCalculator";

try {
  const args = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(args.slice(1), args[0]));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong!';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage, '\n');
}
