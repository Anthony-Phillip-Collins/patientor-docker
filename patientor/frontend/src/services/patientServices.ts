import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types/Patient";
import { PatientFormValues } from "../types/PatientFormValues";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const patientServices = { getAll, getById, create };

export default patientServices;
