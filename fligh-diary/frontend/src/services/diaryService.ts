import axios from "axios";
import { apiBaseUrl } from "../constants";
import { IDiaryEntry, IDiaryEntryNew } from "../types/IDiaryEntry";

const apiUrl = `${apiBaseUrl}/diaries`;

export const getDiaries = async () => {
  const { data } = await axios.get<IDiaryEntry[]>(apiUrl);
  return data;
};

export const saveDiaryEntry = async (diaryEntryNew: IDiaryEntryNew) => {
  const { data } = await axios.post<IDiaryEntry>(apiUrl, diaryEntryNew);
  return data;
};
