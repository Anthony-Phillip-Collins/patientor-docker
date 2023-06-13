import { Gender } from "./enums/Gender";
import { DiagnosisEntry } from "./Diagnosis";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: DiagnosisEntry[];
}

export type PatientNonSensitive = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
