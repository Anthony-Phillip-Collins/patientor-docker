import { v4 as uuidv4 } from 'uuid';
import PatientModel from '../mongo/models/Patient';
import { DiagnosisEntry, NewDiagnosisEntry } from '../types/Diagnosis';
import { NewPatient, Patient, PatientNonSensitive } from '../types/Patient';

const getPatients = async (): Promise<Patient[]> => {
  return await PatientModel.find({});
};

const getPatientById = async (id: string): Promise<Patient | undefined | null> => {
  return await PatientModel.findById(id);
};

const deletePatient = async (id: string): Promise<Patient | undefined | null> => {
  return await PatientModel.findByIdAndDelete(id);
};

const getPatientsNonSensitive = async (): Promise<PatientNonSensitive[]> => {
  const patients = await getPatients();

  return patients.map(({ dateOfBirth, gender, name, occupation, id }: PatientNonSensitive) => ({
    dateOfBirth,
    gender,
    name,
    occupation,
    id,
  }));
};

export const addPatient = async (newPatient: NewPatient): Promise<Patient> => {
  const p = new PatientModel(newPatient);
  const patient = await p.save();

  // if (patientsData.find(({ name }) => name === newPatient.name)) {
  //   throw new Error(`${newPatient.name} already exists!`);
  // }
  // const patient = { ...newPatient, id: uuidv4() };
  // patientsData.push(patient);
  return patient;
};

export const addDiagnosisEntry = async (
  newDiagnosisEntry: NewDiagnosisEntry,
  patientId: string
): Promise<DiagnosisEntry> => {
  const diagnosisEntry = {
    ...newDiagnosisEntry,
    id: uuidv4(),
  };
  const patient = await getPatientById(patientId);
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
  deletePatient,
};
