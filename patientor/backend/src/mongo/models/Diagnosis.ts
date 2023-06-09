import { Schema, model } from 'mongoose';
import { Diagnosis } from '../../types/Diagnosis';

const schema = new Schema<Diagnosis>({
  code: { type: String, required: true },
  name: { type: String, required: true },
  latin: String,
});

const DiagnosisModel = model<Diagnosis>('Diagnosis', schema);

export default DiagnosisModel;
