import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnose } from "../types/Diagnose";

const getAll = async () => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const diagnosesService = {
  getAll,
};

export default diagnosesService;
