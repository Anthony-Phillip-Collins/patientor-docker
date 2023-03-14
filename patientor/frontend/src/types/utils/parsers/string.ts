export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (value: unknown, prop?: unknown): string => {
  if (!value || !isString(value)) {
    let errorMessage = `${value} is not of type string!`;
    if (prop && isString(prop)) {
      errorMessage = `The value '${value}' for the property ${prop} is invalid.`;
    }
    throw new Error(errorMessage);
  }
  return value;
};
