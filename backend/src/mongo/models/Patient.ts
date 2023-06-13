import { Schema, Types, model } from 'mongoose';
import { Patient } from '../../types/Patient';
import schemaToJSON from '../../util/schemaToJSON';

const schema = new Schema<Patient>({
  id: Types.ObjectId,
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  ssn: { type: String },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  entries: [{ type: Types.ObjectId, ref: 'DiagnosisEntry' }],
});

schemaToJSON(schema);

const PatientModel = model<Patient>('Patient', schema);

export default PatientModel;
