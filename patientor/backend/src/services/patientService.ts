import DiagnosisEntryModel from '../mongo/models/DiagnosisEntry';
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

export const addDiagnosisEntry = async (newDiagnosisEntry: NewDiagnosisEntry): Promise<DiagnosisEntry> => {
  // const diagnosisEntry = {
  //   ...newDiagnosisEntry,
  //   id: uuidv4(),
  // };
  const patient = await getPatientById(newDiagnosisEntry.patientId);
  if (!patient) {
    throw new Error('Patient id doesn’t exist.');
  }

  const DiagnosisEntry = DiagnosisEntryModel(newDiagnosisEntry.type);

  let entry;
  try {
    entry = await new DiagnosisEntry(newDiagnosisEntry).save();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Couldn’t save DiagnosisEntry!');
    }
  }

  // patient?.entries.push(diagnosisEntry);
  return entry;
};

export default {
  getPatients,
  getPatientById,
  getPatientsNonSensitive,
  addPatient,
  addDiagnosisEntry,
  deletePatient,
};
