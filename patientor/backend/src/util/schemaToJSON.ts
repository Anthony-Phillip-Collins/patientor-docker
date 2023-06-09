import { Document, Schema } from 'mongoose';

type Callback = ((returnedObject: ReturnedObject) => void) | undefined;

type ReturnedObject = {
  id?: string;
  _id?: string;
  __v?: number;
};

export default (schema: Schema, callback: Callback = undefined) => {
  schema.set('toJSON', {
    transform: (_document: Document, returnedObject: ReturnedObject) => {
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      returnedObject.id = returnedObject._id && returnedObject._id.toString();
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete returnedObject._id;
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete returnedObject.__v;
      if (callback) callback(returnedObject);
    },
  });
};
