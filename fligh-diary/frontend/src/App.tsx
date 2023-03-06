import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import DiaryEntryForm from "./components/DiaryEntryForm/DiaryEntryForm";
import DiaryEntryList from "./components/DiaryEntryList.tsx/DiaryEntryList";
import { getDiaries, saveDiaryEntry } from "./services/diaryService";
import { IDiaryEntry, IDiaryEntryNew } from "./types/IDiaryEntry";

function App() {
  const [diaries, setDiaries] = useState<IDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const timerRef = useRef<number | null>();

  const notify = (message: string) => {
    setErrorMessage(message);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const onDiarySubmit = async (diaryEntryNew: IDiaryEntryNew) => {
    try {
      const diaryEntry = await saveDiaryEntry(diaryEntryNew);
      setDiaries(diaries.concat(diaryEntry));
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        notify(e.response?.data);
      } else {
        notify("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div className="App">
      <h2>Add new entry</h2>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <DiaryEntryForm onSubmit={onDiarySubmit} />
      <h2>Diary entries:</h2>
      <DiaryEntryList data={diaries} />
    </div>
  );
}

export default App;
