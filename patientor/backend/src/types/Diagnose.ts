export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface DiagnoseEntryBase {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[];
}

interface HealthCheck extends DiagnoseEntryBase {
  type: 'HealthCheck';
  healthCheckRating: number;
}

interface HospitalEntry extends DiagnoseEntryBase {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends DiagnoseEntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type DiagnoseEntry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheck;
