import { Schema, model } from 'mongoose';
import { HealthCheck, HospitalEntry, OccupationalHealthcareEntry } from '../../types/Diagnosis';
import schemaToJSON from '../../util/schemaToJSON';

const collection = 'diagnosisEntries';

const base = {
  type: String,
  id: String,
  date: String,
  specialist: String,
  description: String,
  diagnosisCodes: [{ type: String }],
  patientId: String,
};

export const healthCheckSchema = new Schema<HealthCheck>({
  ...base,
  healthCheckRating: { type: Number },
});

schemaToJSON(healthCheckSchema);

const HealthCheckModel = model<HealthCheck>('HealthCheck', healthCheckSchema, collection);

export const hospitalEntrySchema = new Schema<HospitalEntry>({
  ...base,
  discharge: { date: String, criteria: String },
});

schemaToJSON(hospitalEntrySchema);

const HospitalEntryModel = model<HospitalEntry>('HospitalEntry', hospitalEntrySchema, collection);

export const occupationalHealthcareEntry = new Schema<OccupationalHealthcareEntry>({
  ...base,
  employerName: String,
  sickLeave: {
    startDate: String,
    endDate: String,
  },
});

schemaToJSON(occupationalHealthcareEntry);

const OccupationalHealthcareEntryModel = model<OccupationalHealthcareEntry>(
  'OccupationalHealthcareEntry',
  occupationalHealthcareEntry,
  collection
);

// const DiagnosisEntryModels = { HealthCheckModel, HospitalEntryModel, OccupationalHealthcareEntryModel };

const DiagnosisEntryModel = (type: string) => {
  switch (type) {
    case 'HealthCheck':
      return HealthCheckModel;
    case 'Hospital':
      return HospitalEntryModel;
    case 'OccupationalHealthcare':
      return OccupationalHealthcareEntryModel;
    default:
      throw new Error('Invalid type');
  }
};

export default DiagnosisEntryModel;
