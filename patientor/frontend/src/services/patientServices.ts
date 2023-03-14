import axios from "axios";

import { apiBaseUrl } from "../constants";
import { DiagnosisEntry, NewDiagnosisEntry } from "../types/Diagnosis";
import { Patient, PatientFormValues } from "../types/Patient";

const baseUrl = `${apiBaseUrl}/patients`;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(baseUrl);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${baseUrl}/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${baseUrl}`, object);
  return data;
};

const addDiagnosisEntry = async (userId: string, newEntry: NewDiagnosisEntry) => {
  const { data } = await axios.post<DiagnosisEntry>(`${baseUrl}/${userId}/entries`, newEntry);
  return data;
};

const patientServices = { getAll, getById, create, addDiagnosisEntry };

export default patientServices;
