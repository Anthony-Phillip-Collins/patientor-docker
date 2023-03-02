import { isString } from './string';

export const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

export const parseDate = (value: unknown): string => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error(`${value} is not a valid Date.`);
  }
  return value;
};
