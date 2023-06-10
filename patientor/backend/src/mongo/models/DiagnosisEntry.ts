import { Schema, model } from 'mongoose';
import { DiagnosisEntry, HealthCheck, HospitalEntry, OccupationalHealthcareEntry } from '../../types/Diagnosis';
import schemaToJSON from '../../util/schemaToJSON';

const collection = 'diagnosisEntries';

const base = {
  type: { type: String, required: true },
  date: { type: String, required: true },
  specialist: { type: String, required: true },
  description: String,
  diagnosisCodes: [{ type: String }],
  patientId: { type: String, required: true },
};

/* DiagnosisEntry */

const diagnosisEntrySchema = new Schema<DiagnosisEntry>({});

schemaToJSON(diagnosisEntrySchema);

const DiagnosisEntryModel = model<DiagnosisEntry>('DiagnosisEntry', diagnosisEntrySchema, collection);

/* HealthCheck */

const healthCheckSchema = new Schema<HealthCheck>({
  ...base,
  healthCheckRating: { type: Number, required: true },
});

healthCheckSchema.pre('find', function () {
  this.getQuery().type = 'HealthCheck';
});

schemaToJSON(healthCheckSchema);

const HealthCheckModel = model<HealthCheck>('HealthCheck', healthCheckSchema, collection);

/* Hospital */

const hospitalSchema = new Schema<HospitalEntry>({
  ...base,
  discharge: { date: { type: String, required: true }, criteria: { type: String, required: true } },
});

hospitalSchema.pre('find', function () {
  this.getQuery().type = 'Hospital';
});

schemaToJSON(hospitalSchema);

const HospitalModel = model<HospitalEntry>('Hospital', hospitalSchema, collection);

/* OccupationalHealthcare */

const occupationalHealthcareSchema = new Schema<OccupationalHealthcareEntry>({
  ...base,
  employerName: { type: String, required: true },
  sickLeave: {
    startDate: String,
    endDate: String,
  },
});

occupationalHealthcareSchema.pre('find', function () {
  this.getQuery().type = 'OccupationalHealthcare';
});

schemaToJSON(occupationalHealthcareSchema);

const OccupationalHealthcareModel = model<OccupationalHealthcareEntry>(
  'OccupationalHealthcareEntry',
  occupationalHealthcareSchema,
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
