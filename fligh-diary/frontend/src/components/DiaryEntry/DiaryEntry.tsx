import { IDiaryEntry } from "../../types/IDiaryEntry";

interface IDiaryEntryProps {
  data: IDiaryEntry;
}

const DiaryEntry = ({
  data: { date, visibility, weather, comment },
}: IDiaryEntryProps) => {
  return (
    <>
      <h3>{date}</h3>
      <div>visibility: {visibility}</div>
      <div>weather: {weather}</div>
      {comment && comment !== "" && <div>comment: {comment}</div>}
    </>
  );
};
export default DiaryEntry;
