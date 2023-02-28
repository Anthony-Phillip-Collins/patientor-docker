interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
  error?: string;
}

interface ExerciseRating {
  score: number;
  description: string;
}

export interface ExerciseError {
  error: string;
}

export interface ExerciseInput {
  daily_exercises: number[];
  target: number;
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

export const calculateExercises = (
  daily_exercises: number[],
  target: number
): ExerciseResult | ExerciseError => {
  const errorMissing: ExerciseError = {
    error: 'parameters missing',
  };

  const errorMalformed: ExerciseError = {
    error: 'malformatted parameters',
  };

  if (!daily_exercises || !target) {
    return errorMissing;
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return errorMalformed;
  }

  const average: number =
    daily_exercises.reduce((a, b) => a + b, 0) / daily_exercises.length;

  if (isNaN(average)) {
    return errorMalformed;
  }

  const getExerciseRating = (): ExerciseRating => {
    if (average >= target) {
      return {
        score: 3,
        description: "You've reached your target, well done!",
      };
    } else if (average < target && average > target - 1) {
      return { score: 2, description: 'Not too bad but could be better!' };
    } else {
      return {
        score: 1,
        description: 'Oh man that was terrible, try harder next time!',
      };
    }
  };

  const rating: ExerciseRating = getExerciseRating();

  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter((hours) => hours > 0).length,
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
  let errorMessage = 'Something went wrong!';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage, '\n');
}
