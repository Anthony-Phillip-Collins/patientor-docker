export enum HealthCheckRating {
  Good = 0,
  Ok = 1,
  Bad = 2,
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnoseEntryBase {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[];
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HealthCheck extends DiagnoseEntryBase {
  type: "HealthCheck";
  healthCheckRating:
    | HealthCheckRating.Good
    | HealthCheckRating.Ok
    | HealthCheckRating.Bad;
}

interface HospitalEntry extends DiagnoseEntryBase {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends DiagnoseEntryBase {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type DiagnoseEntry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheck;
