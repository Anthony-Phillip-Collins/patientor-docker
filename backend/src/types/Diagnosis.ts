import UnionOmit from './utils/unionOmit';

export const DiagnosisType = Object.freeze({
  HealthCheck: 'HealthCheck',
  Hospital: 'Hospital',
  OccupationalHealthcare: 'OccupationalHealthcare',
});

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnosisEntryBase {
  id?: string;
  _id?: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  patientId: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HealthCheck extends DiagnosisEntryBase {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends DiagnosisEntryBase {
  type: 'Hospital';
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends DiagnosisEntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export type DiagnosisEntry = HospitalEntry | OccupationalHealthcareEntry | HealthCheck;

export type NewDiagnosisEntry = UnionOmit<DiagnosisEntry, 'id'>;

export type NewDiagnosisEntryBase = Omit<DiagnosisEntryBase, 'id'>;
