export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnosisEntryBase {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HealthCheck extends DiagnosisEntryBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends DiagnosisEntryBase {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends DiagnosisEntryBase {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type DiagnosisEntry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheck;
