import UnionOmit from "./utils/unionOmit";

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

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HealthCheck extends DiagnosisEntryBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends DiagnosisEntryBase {
  type: "Hospital";
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends DiagnosisEntryBase {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type DiagnosisEntry = HospitalEntry | OccupationalHealthcareEntry | HealthCheck;

export type NewDiagnosisEntry = UnionOmit<DiagnosisEntry, "id">;

export type NewDiagnosisEntryBase = Omit<DiagnosisEntryBase, "id">;
