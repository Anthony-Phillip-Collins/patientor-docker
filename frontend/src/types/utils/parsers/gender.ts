import { Gender } from '../../enums/Gender';
import { isString } from './string';

export const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(value);
};

export const parseGender = (value: unknown): Gender => {
  if (!value || !isString(value) || !isGender(value)) {
    throw new Error(`${value} is not of type Gender.`);
  }
  return value;
};
