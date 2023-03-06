import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diary } from "../types/Diary";

const apiUrl = `${apiBaseUrl}/diaries`

export const getDiaries = async () => {
  const { data } = await axios.get<Diary>(apiUrl);

  return data;
}