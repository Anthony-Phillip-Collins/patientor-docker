import { isString } from './string';

const hasDateFormat = (value: string): boolean => {
  /* correct format: yyy-mm-dd */
  const format = [4, 2, 2];
  return value
    .split('-')
    .reduce((result, v, i) => result && v.length === format[i], true);
};

export const isDate = (value: string): boolean => {
  return !!value && Boolean(Date.parse(value)) && hasDateFormat(value);
};

export const parseDate = (value: unknown): string => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error(`${value} is not a valid Date.`);
  }
  return value;
};
