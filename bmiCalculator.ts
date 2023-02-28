interface Category {
  min: number;
  max: number;
  category: string;
}

interface Arguments {
  weight: number;
  height: number;
}

interface BmiResult extends Arguments {
  bmi: number;
  category: string;
}

interface BmiError {
  error: string;
}

const bmiMap: Category[] = [
  { min: 0, max: 16, category: 'Underweight (Severe thinness)' },
  { min: 16.0, max: 17, category: 'Underweight (Moderate thinness)' },
  { min: 17.0, max: 18.5, category: 'Underweight (Mild thinness)' },
  { min: 18.5, max: 25.0, category: 'Normal range (Healthy)' },
  { min: 25.0, max: 30.0, category: 'Overweight (Pre-obese)' },
  { min: 30.0, max: 35.0, category: 'Obese (Class I)' },
  { min: 35.0, max: 40.0, category: 'Obese (Class II)' },
  { min: 40.0, max: 300.0, category: 'Obese (Class III)' },
];

const parseArgumentsBmi = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');

  const parsedArguments: Arguments = {
    height: Number(args[2]),
    weight: Number(args[3]),
  };

  if (!isNaN(parsedArguments.weight) && !isNaN(parsedArguments.height)) {
    return parsedArguments;
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (
  height: number,
  weight: number
): BmiResult | BmiError => {
  const error = {
    error: 'malformatted parameters',
  };

  if (!height || !weight) {
    return error;
  }

  const bmi: number = parseFloat(
    (weight / Math.pow(height / 100, 2)).toFixed(1)
  );

  const result: Category | undefined = bmiMap.find(
    (cat: Category) => bmi >= cat.min && bmi < cat.max
  );

  if (!result?.category) {
    return error;
  }

  return {
    weight,
    height,
    bmi,
    category: result.category,
  };
};

try {
  const { height, weight }: Arguments = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight), '\n');
} catch (error: unknown) {
  let errorMessage: string = 'Something went wrong!';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage, '\n');
}
