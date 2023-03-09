import { Gender } from '../enums/Gender';
import { DiagnoseEntry } from './Diagnose';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: DiagnoseEntry[];
}

export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
