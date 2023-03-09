import { Patient } from "./Patient";

export type PatientFormValues = Omit<Patient, "id" | "entries">;
