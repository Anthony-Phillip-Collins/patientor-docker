import { Gender } from '../enums/Gender';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type PatientNonSensitive = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;
