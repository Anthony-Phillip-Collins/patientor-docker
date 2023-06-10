import { GetDiagnosisEntryModel } from '../mongo/models/DiagnosisEntry';
import PatientModel from '../mongo/models/Patient';
import { DiagnosisEntry, NewDiagnosisEntry } from '../types/Diagnosis';
import { NewPatient, Patient, PatientNonSensitive } from '../types/Patient';

const getPatients = async (): Promise<Patient[]> => {
  return await PatientModel.find({});
};

const getPatientById = async (id: string): Promise<Patient | undefined | null> => {
  // const d: DiagnosisEntry[] = await DiagnosisEntryModels.DiagnosisEntryModel.find({ patientId: id });
  // console.log('////////////////@@@@@@@@@@@@@@@', d);
  return await PatientModel.findById(id).populate('entries');
};

const deletePatient = async (id: string): Promise<Patient | undefined | null> => {
  return await PatientModel.findByIdAndDelete(id);
};

const getPatientsNonSensitive = async (): Promise<PatientNonSensitive[]> => {
  return await PatientModel.find({}, 'id name dateOfBirth gender occupation');
};

export const addPatient = async (newPatient: NewPatient): Promise<Patient> => {
  const patient = new PatientModel(newPatient);
  return await patient.save();
};

export const addDiagnosisEntry = async (newDiagnosisEntry: NewDiagnosisEntry): Promise<DiagnosisEntry> => {
  const patient = await getPatientById(newDiagnosisEntry.patientId);
  if (!patient) {
    throw new Error('Patient id doesn’t exist.');
  }

  let entry;
  try {
    const DiagnosisEntry = GetDiagnosisEntryModel(newDiagnosisEntry.type);
    entry = await new DiagnosisEntry(newDiagnosisEntry).save();
    await PatientModel.findByIdAndUpdate(newDiagnosisEntry.patientId, { $addToSet: { entries: entry._id.toString() } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Couldn’t save DiagnosisEntry!');
    }
  }

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
