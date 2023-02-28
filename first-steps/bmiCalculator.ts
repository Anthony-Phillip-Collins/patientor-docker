interface IBmiCategory {
  min: number;
  max: number;
  category: string;
}

export interface IBmiArguments {
  weight: number;
  height: number;
}

export interface IBmiResult extends IBmiArguments {
  bmi: number;
  category: string;
  error?: string;
}

export interface IBmiError {
  error: string;
}

const bmiMap: IBmiCategory[] = [
  { min: 0, max: 16, category: 'Underweight (Severe thinness)' },
  { min: 16.0, max: 17, category: 'Underweight (Moderate thinness)' },
  { min: 17.0, max: 18.5, category: 'Underweight (Mild thinness)' },
  { min: 18.5, max: 25.0, category: 'Normal range (Healthy)' },
  { min: 25.0, max: 30.0, category: 'Overweight (Pre-obese)' },
  { min: 30.0, max: 35.0, category: 'Obese (Class I)' },
  { min: 35.0, max: 40.0, category: 'Obese (Class II)' },
  { min: 40.0, max: 300.0, category: 'Obese (Class III)' },
];

export const parseArgumentsBmi = (args: string[]): IBmiArguments => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');

  const parsedArguments: IBmiArguments = {
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
): IBmiResult | IBmiError => {
  const error: IBmiError = {
    error: 'malformatted parameters',
  };

  if (!height || !weight) {
    return error;
  }

  const bmi: number = parseFloat(
    (weight / Math.pow(height / 100, 2)).toFixed(1)
  );

  const result: IBmiCategory | undefined = bmiMap.find(
    (cat: IBmiCategory) => bmi >= cat.min && bmi < cat.max
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