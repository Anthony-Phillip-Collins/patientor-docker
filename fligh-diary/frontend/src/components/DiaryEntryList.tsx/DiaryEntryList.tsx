import { IDiaryEntry } from "../../types/IDiaryEntry";
import DiaryEntry from "../DiaryEntry/DiaryEntry";

interface IDiaryEntryListProps {
  data: IDiaryEntry[];
}

const DiaryEntryList = ({ data }: IDiaryEntryListProps) => {
  return (
    <>
      {data.map((diary) => (
        <DiaryEntry key={diary.id} data={diary} />
      ))}
    </>
  );
};

export default DiaryEntryList;
