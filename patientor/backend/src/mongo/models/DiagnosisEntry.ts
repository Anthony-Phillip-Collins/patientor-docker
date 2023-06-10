import { Schema, model } from 'mongoose';
import { DiagnosisEntry, HealthCheck, HospitalEntry, OccupationalHealthcareEntry } from '../../types/Diagnosis';
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

/* DiagnosisEntry */

const diagnosisEntrySchema = new Schema<DiagnosisEntry>({});

schemaToJSON(diagnosisEntrySchema);

const DiagnosisEntryModel = model<DiagnosisEntry>('DiagnosisEntry', diagnosisEntrySchema, collection);

/* HealthCheck */

const healthCheckSchema = new Schema<HealthCheck>({
  ...base,
  healthCheckRating: { type: Number },
});

healthCheckSchema.pre('find', function () {
  this.getQuery().type = 'HealthCheck';
});

schemaToJSON(healthCheckSchema);

const HealthCheckModel = model<HealthCheck>('HealthCheck', healthCheckSchema, collection);

/* Hospital */

const hospitalSchema = new Schema<HospitalEntry>({
  ...base,
  discharge: { date: String, criteria: String },
});

hospitalSchema.pre('find', function () {
  this.getQuery().type = 'Hospital';
});

schemaToJSON(hospitalSchema);

const HospitalModel = model<HospitalEntry>('Hospital', hospitalSchema, collection);

/* OccupationalHealthcare */

const occupationalHealthcareEntrySchema = new Schema<OccupationalHealthcareEntry>({
  ...base,
  employerName: String,
  sickLeave: {
    startDate: String,
    endDate: String,
  },
});

occupationalHealthcareEntrySchema.pre('find', function () {
  this.getQuery().type = 'OccupationalHealthcare';
});

schemaToJSON(occupationalHealthcareEntrySchema);

const OccupationalHealthcareModel = model<OccupationalHealthcareEntry>(
  'OccupationalHealthcareEntry',
  occupationalHealthcareEntrySchema,
  collection
);

export const DiagnosisEntryModels = {
  DiagnosisEntryModel,
  HealthCheckModel,
  HospitalModel,
  OccupationalHealthcareModel,
};

export const GetDiagnosisEntryModel = (type: string) => {
  switch (type) {
    case 'HealthCheck':
      return HealthCheckModel;
    case 'Hospital':
      return HospitalModel;
    case 'OccupationalHealthcare':
      return OccupationalHealthcareModel;
    default:
      throw new Error('Invalid type');
  }
};
