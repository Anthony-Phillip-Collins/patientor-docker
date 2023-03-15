import {
  Diagnosis,
  Discharge,
  HealthCheckRating,
  NewDiagnosisEntry,
  NewDiagnosisEntryBase,
  SickLeave,
} from '../../Diagnosis';
import assertNever from '../assertNever';
import { parseDate } from './date';
import { compareObjectShapes } from './object';
import { parseString } from './string';

const isNewDiagnosisEntry = (object: unknown): object is NewDiagnosisEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Diagnosis data is missing.');
  }

  const mandatory = ['date', 'specialist', 'description', 'type'];
  const mandatoryOk =
    mandatory.filter((p) => p in object).length === mandatory.length;

  return mandatoryOk;
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((g) => Number(g))
    .includes(value);
};

export const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  const numValue = Number(value);

  if (isNaN(numValue) || !isHealthCheckRating(numValue)) {
    throw new Error(`The value of healthCheckRating is invalid.`);
  }
  return numValue;
};

const isDischarge = (object: unknown): object is Discharge => {
  const blueprint: Discharge = {
    criteria: '',
    date: '',
  };

  return compareObjectShapes(object, blueprint);
};

const parseDischarge = (object: unknown): Discharge => {
  if (!isDischarge(object)) {
    throw new Error(`Not of type Discharge: ${JSON.stringify(object)}`);
  }
  return {
    criteria: parseString(object.criteria, 'criteria'),
    date: parseDate(object.date, 'discharge date'),
  };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isSickLeave = (object: unknown): object is SickLeave => {
  const blueprint: SickLeave = {
    startDate: '',
    endDate: '',
  };

  return compareObjectShapes(object, blueprint);
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!isSickLeave(object)) {
    throw new Error(`Not of type SickLeave: ${JSON.stringify(object)}`);
  }
  return {
    startDate: parseDate(object.startDate, 'sickLeave startDate'),
    endDate: parseDate(object.endDate, 'sickLeave endDate'),
  };
};

export const parseNewDiagnosisEntry = (object: unknown): NewDiagnosisEntry => {
  if (!isNewDiagnosisEntry(object)) {
    throw new Error('Some Diagnosis data fields are missing.');
  }

  const newEntryBase: NewDiagnosisEntryBase = {
    date: parseDate(object.date, 'date'),
    specialist: parseString(object.specialist, 'specialist'),
    description: parseString(object.description, 'description'),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...newEntryBase,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object?.healthCheckRating),
      };
    case 'Hospital':
      return {
        ...newEntryBase,
        type: 'Hospital',
        discharge: parseDischarge(object?.discharge),
      };
    case 'OccupationalHealthcare': {
      const newOccupationalHeathcareEntry: NewDiagnosisEntry = {
        ...newEntryBase,
        type: 'OccupationalHealthcare',
        employerName: parseString(object?.employerName, 'employerName'),
      };

      if (
        'sickLeave' in object &&
        !(
          object.sickLeave?.startDate === '' && object.sickLeave?.endDate === ''
        )
      ) {
        newOccupationalHeathcareEntry.sickLeave = parseSickLeave(
          object?.sickLeave
        );
      }
      return newOccupationalHeathcareEntry;
    }
    default:
      return assertNever(object);
  }
};
