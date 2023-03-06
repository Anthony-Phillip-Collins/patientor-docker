export const dateToString = (date: Date) => {
  const toDoubleDigitString = (value: number): string =>
    value < 10 ? "0" + value.toString() : value.toString();
  const year = date.getFullYear().toString();
  const month = toDoubleDigitString(date.getMonth());
  const day = toDoubleDigitString(date.getDay());
  return `${year}-${month}-${day}`;
};
