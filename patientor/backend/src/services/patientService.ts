import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patientsData';
import { NewPatient, Patient, PatientNonSensitive } from '../types/Patient';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientsNonSensitive = (): PatientNonSensitive[] => {
  return patientsData.map((patient) => {
    const p = { ...patient };
    delete p.ssn;
    return p;
  });
};

export const addPatient = (newPatient: NewPatient): Patient => {
  if (patientsData.find(({ name }) => name === newPatient.name)) {
    throw new Error(`${newPatient.name} already exists!`);
  }
  const patient = { ...newPatient, id: uuidv4() };
  patientsData.push(patient);
  return patient;
};
export default {
  getPatients,
  getPatientsNonSensitive,
  addPatient,
};
