import { connect } from 'mongoose';
import config from '../config';

const options = {};
const dbURI = config.MONGO_URL || '';

export default async () => connect(dbURI, options);
