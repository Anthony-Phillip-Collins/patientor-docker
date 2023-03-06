import { useEffect, useState } from "react";
import DiaryEntryList from "./components/DiaryEntryList.tsx/DiaryEntryList";
import { getDiaries } from "./services/diaryService";
import { Diary } from "./types/Diary";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div className="App">
      <DiaryEntryList data={diaries} />
    </div>
  );
}

export default App;
