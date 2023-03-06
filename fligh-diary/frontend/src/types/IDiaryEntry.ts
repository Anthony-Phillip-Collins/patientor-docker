export interface IDiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type IDiaryEntryNew = Omit<IDiaryEntry, "id">;
