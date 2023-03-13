import { NewPatient } from '../../Patient';
import { parseDate } from './date';
import { parseGender } from './gender';
import { parseString } from './string';

export const isNewPatient = (object: unknown): object is NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Patient data is missing.');
  }
  const mandatory = ['name', 'dateOfBirth', 'gender', 'occupation'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseNewPatient = (object: unknown): NewPatient => {
  if (!isNewPatient(object)) {
    throw new Error('Some Patient data fields are missing.');
  }

  let newPatient: NewPatient = {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    entries: [],
  };

  if ('ssn' in object) {
    newPatient = { ...newPatient, ssn: parseString(object.ssn, 'ssn') };
  }

  return newPatient;
};
