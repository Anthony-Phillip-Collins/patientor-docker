interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  score: number;
  description: string;
}

const parseArgumentsExercise = (args: string[]): number[] => {
  if (args.length < 4) throw new Error('Not enough arguments!');

  let errorMessage = '';

  const hoursPerDay: number[] = args.slice(2).map((arg) => {
    const hours = Number(arg);

    if (isNaN(hours)) {
      errorMessage = 'All values must me numbers!';
    }

    return hours;
  });

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return hoursPerDay;
};

const calculateExercises = (
  hoursOfTrainingPerDay: number[],
  target: number
): Result => {
  const average: number =
    hoursOfTrainingPerDay.reduce((a, b) => a + b, 0) /
    hoursOfTrainingPerDay.length;

  const getRating = (): Rating => {
    if (average >= target) {
      return {
        score: 1,
        description: "You've reached your target, well done!",
      };
    } else if (average < target && average > target - 1) {
      return { score: 2, description: 'Not too bad but could be better!' };
    } else {
      return {
        score: 3,
        description: 'Oh man that was terrible, try harder next time!',
      };
    }
  };

  const rating: Rating = getRating();

  return {
    periodLength: hoursOfTrainingPerDay.length,
    trainingDays: hoursOfTrainingPerDay.filter((hours) => hours > 0).length,
    success: average > target,
    rating: rating.score,
    ratingDescription: rating.description,
    target,
    average,
  };
};

try {
  const args = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(args.slice(1), args[0]));
} catch (error: unknown) {
  let errorMessage: string = 'Something went wrong!';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage, '\n');
}
