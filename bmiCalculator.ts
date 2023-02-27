interface Category {
  min: number;
  max: number;
  category: string;
}

interface Arguments {
  weight: number;
  height: number;
}

const bmiMap: Category[] = [
  { min: 0, max: 16, category: 'Underweight (Severe thinness)' },
  { min: 16.0, max: 17, category: 'Underweight (Moderate thinness)' },
  { min: 17.0, max: 18.5, category: 'Underweight (Mild thinness)' },
  { min: 18.5, max: 25.0, category: 'Normal range (Healthy)' },
  { min: 25.0, max: 30.0, category: 'Overweight (Pre-obese)' },
  { min: 30.0, max: 35.0, category: 'Obese (Class I)' },
  { min: 35.0, max: 40.0, category: 'Obese (Class II)' },
  { min: 40.0, max: 200.0, category: 'Obese (Class III)' },
];

const parseArgumentsBmi = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');

  const arguments: Arguments = {
    height: Number(args[2]),
    weight: Number(args[3]),
  };

  if (!isNaN(arguments.weight) && !isNaN(arguments.height)) {
    return arguments;
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = parseFloat(
    (weight / Math.pow(height / 100, 2)).toFixed(1)
  );

  const result: Category = bmiMap.find(
    (cat: Category) => bmi >= cat.min && bmi < cat.max
  );
  return `${result.category} | bmi: ${bmi}`;
};

try {
  const { height, weight }: Arguments = parseArgumentsBmi(process.argv);
  console.log('\n', calculateBmi(height, weight), '\n');
} catch (error: unknown) {
  let errorMessage: string = 'Something went wrong!';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}
