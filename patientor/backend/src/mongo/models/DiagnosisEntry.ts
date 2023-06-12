import { Schema, model } from 'mongoose';
import {
  DiagnosisEntry,
  DiagnosisType,
  HealthCheck,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types/Diagnosis';
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

/* DiagnosisEntry - used after saving instance, see comment for DiagnosisEntryCreate */

const diagnosisEntrySchema = new Schema<DiagnosisEntry>({});

schemaToJSON(diagnosisEntrySchema);

const DiagnosisEntryModel = model<DiagnosisEntry>('DiagnosisEntry', diagnosisEntrySchema, collection);

/* HealthCheck */

const healthCheckSchema = new Schema<HealthCheck>({
  ...base,
  healthCheckRating: { type: Number, required: true },
});

schemaToJSON(healthCheckSchema);

const HealthCheckModel = model<HealthCheck>(DiagnosisType.HealthCheck, healthCheckSchema, collection);

/* Hospital */

const hospitalSchema = new Schema<HospitalEntry>({
  ...base,
  discharge: { date: { type: String, required: true }, criteria: { type: String, required: true } },
});

schemaToJSON(hospitalSchema);

const HospitalModel = model<HospitalEntry>(DiagnosisType.Hospital, hospitalSchema, collection);

/* OccupationalHealthcare */

const occupationalHealthcareSchema = new Schema<OccupationalHealthcareEntry>({
  ...base,
  employerName: { type: String, required: true },
  sickLeave: {
    startDate: String,
    endDate: String,
  },
});

schemaToJSON(occupationalHealthcareSchema);

const OccupationalHealthcareModel = model<OccupationalHealthcareEntry>(
  DiagnosisType.OccupationalHealthcare,
  occupationalHealthcareSchema,
  collection
);

/* Workaround for saving an instance of Union type DiagnosisEntry
 * Example:
 *  const EntryModel = DiagnosisEntryCreate(DiagnosisType.HealthCheck);
 *  entry = await new EntryModel(obj as NewDiagnosisEntry).save();
 *
 * DiagnosisEntryCreate is only used for the creation of new DiagnosisEntry instances.
 * All other actions after creation e.g. Querying the database etc. are done with DiagnosisEntryModel.
 * Example:
 *  e.g. DiagnosisEntryModel.find({ patientId: id });
 */

const DiagnosisEntryCreate = (type: string) => {
  switch (type) {
    case DiagnosisType.HealthCheck:
      return HealthCheckModel;
    case DiagnosisType.Hospital:
      return HospitalModel;
    case DiagnosisType.OccupationalHealthcare:
      return OccupationalHealthcareModel;
    default:
      throw new Error('Invalid type');
  }
};

export { DiagnosisEntryModel, DiagnosisEntryCreate };
