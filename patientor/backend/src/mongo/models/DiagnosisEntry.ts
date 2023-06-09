import { Schema, model } from 'mongoose';
import { HealthCheck, HospitalEntry, OccupationalHealthcareEntry } from '../../types/Diagnosis';

const collection = 'diagnosisEntries';

export const healthCheckSchema = new Schema<HealthCheck>({
  type: String,
  id: String,
  date: String,
  specialist: String,
  description: String,
  diagnosisCodes: [{ type: String }],
  patientId: String,
  healthCheckRating: { type: Number },
});

const HealthCheckModel = model<HealthCheck>('HealthCheck', healthCheckSchema, collection);

// const b = {
//   id: String,
//   date: String,
//   type: "Hospital",
//   specialist: String,
//   diagnosisCodes: String[],
//   description: String,
//   discharge: { date: String, criteria: String }; }

export const hospitalEntrySchema = new Schema<HospitalEntry>({
  type: String,
  id: String,
  date: String,
  specialist: String,
  description: String,
  diagnosisCodes: [{ String }],
  patientId: String,
  discharge: { date: String, criteria: String },
});

const HospitalEntryModel = model<HospitalEntry>('HospitalEntry', hospitalEntrySchema, collection);

export const occupationalHealthcareEntry = new Schema<OccupationalHealthcareEntry>({
  type: String,
  id: String,
  date: String,
  specialist: String,
  description: String,
  diagnosisCodes: [{ code: { type: String, required: true }, name: { type: String, required: true }, latin: String }],
  patientId: String,
  employerName: String,
  sickLeave: {
    startDate: String,
    endDate: String,
  },
});

const OccupationalHealthcareEntryModel = model<OccupationalHealthcareEntry>(
  'OccupationalHealthcareEntry',
  occupationalHealthcareEntry,
  collection
);

const DiagnosisEntryModels = { HealthCheckModel, HospitalEntryModel, OccupationalHealthcareEntryModel };

export default DiagnosisEntryModels;
