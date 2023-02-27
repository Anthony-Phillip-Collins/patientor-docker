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

const calculateExercises = (
  hoursOfTrainingPerDay: number[],
  target: number
): Result => {
  const average: number =
    hoursOfTrainingPerDay.reduce((a, b) => a + b, 0) /
    hoursOfTrainingPerDay.length;

  const getRating = (): Rating => {
    if (average > target) {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
