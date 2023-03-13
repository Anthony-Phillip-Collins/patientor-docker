import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patientsData';
import { DiagnosisEntry, NewDiagnosisEntry } from '../types/Diagnosis';
import { NewPatient, Patient, PatientNonSensitive } from '../types/Patient';

const getPatients = (): Patient[] => {
  patientsData.forEach((p) => {
    p.entries = p.entries || [];
  });
  return patientsData;
};

const getPatientById = (id: string): Patient | undefined => {
  return getPatients().find((p) => p.id.toString() === id);
};

const getPatientsNonSensitive = (): PatientNonSensitive[] => {
  return getPatients().map(
    ({ dateOfBirth, gender, name, occupation, id }: PatientNonSensitive) => ({
      dateOfBirth,
      gender,
      name,
      occupation,
      id,
    })
  );
};

export const addPatient = (newPatient: NewPatient): Patient => {
  if (patientsData.find(({ name }) => name === newPatient.name)) {
    throw new Error(`${newPatient.name} already exists!`);
  }
  const patient = { ...newPatient, id: uuidv4() };
  patientsData.push(patient);
  return patient;
};

export const addDiagnosisEntry = (
  newDiagnosisEntry: NewDiagnosisEntry,
  patientId: string
): DiagnosisEntry => {
  const diagnosisEntry = {
    ...newDiagnosisEntry,
    id: uuidv4(),
  };
  const patient = getPatientById(patientId);
  if (!patient) {
    throw new Error('Patient id doesn’t exist.');
  }

  patient?.entries.push(diagnosisEntry);
  return diagnosisEntry;
};

export default {
  getPatients,
  getPatientById,
  getPatientsNonSensitive,
  addPatient,
  addDiagnosisEntry,
};
