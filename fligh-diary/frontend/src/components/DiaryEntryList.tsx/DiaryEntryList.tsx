import { Diary } from "../../types/Diary";
import DiaryEntry from "../DiaryEntry/DiaryEntry";

interface DiaryEntryListProps {
  data: Diary[];
}

const DiaryEntryList = ({ data }: DiaryEntryListProps) => {
  return (
    <>
      <h2>Diary entries:</h2>
      {data.map((diary) => (
        <DiaryEntry key={diary.id} data={diary} />
      ))}
    </>
  );
};

export default DiaryEntryList;
