type category = { min: number; max: number; category: string };

const bmiMap: category[] = [
  { min: 0, max: 16, category: 'Underweight (Severe thinness)' },
  { min: 16.0, max: 17, category: 'Underweight (Moderate thinness)' },
  { min: 17.0, max: 18.5, category: 'Underweight (Mild thinness)' },
  { min: 18.5, max: 25.0, category: 'Normal range (Healthy)' },
  { min: 25.0, max: 30.0, category: 'Overweight (Pre-obese)' },
  { min: 30.0, max: 35.0, category: 'Obese (Class I)' },
  { min: 35.0, max: 40.0, category: 'Obese (Class II)' },
  { min: 40.0, max: 200.0, category: 'Obese (Class III)' },
];

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = parseFloat(
    (weight / Math.pow(height / 100, 2)).toFixed(1)
  );

  const result: category = bmiMap.find(
    (cat: category) => bmi >= cat.min && bmi < cat.max
  );

  return `A bmi with the value of ${bmi} is categorized as "${result.category}"`;
};

console.log(calculateBmi(180, 74));
