import { Schema, Types, model } from 'mongoose';
import { Patient } from '../../types/Patient';

const schema = new Schema<Patient>({
  id: Types.ObjectId,
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  ssn: { type: String },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  entries: [
    { healthCheckRating: { type: Number } },
    { type: String, required: true },
    {
      discharge: {
        date: String,
        criteria: String,
      },
    },
    { employerName: String },
    { sickLeave: { startDate: String, endDate: String } },
  ],
});

// schemaToJSON(schema);

// type Callback = ((returnedObject: ReturnedObject) => void) | undefined;

type ReturnedObject = {
  id?: string;
  _id?: string;
  __v?: number;
};

schema.set('toJSON', {
  transform: (_document, returnedObject: ReturnedObject) => {
    returnedObject.id = returnedObject._id && returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// schema.set('toJSON', {
//   transform: (_document: Document, returnedObject: ReturnedObject) => {
//     // eslint-disable-next-line no-param-reassign, no-underscore-dangle
//     returnedObject.id = returnedObject._id && returnedObject._id.toString();
//     // eslint-disable-next-line no-underscore-dangle, no-param-reassign
//     delete returnedObject._id;
//     // eslint-disable-next-line no-underscore-dangle, no-param-reassign
//     delete returnedObject.__v;
//     // if (callback) callback(returnedObject);
//   },
// });

const PatientModel = model<Patient>('Patient', schema);

export default PatientModel;
