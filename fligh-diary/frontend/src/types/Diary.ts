export interface Diary {
  id: number;
  date: string;
  weather: "poor" | "sunny" | "windy" | "cloudy";
  visibility: "poor" | "good";
  comment: string;
}
