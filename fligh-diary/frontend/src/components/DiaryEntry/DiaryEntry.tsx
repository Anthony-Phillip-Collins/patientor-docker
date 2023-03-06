import { Diary } from "../../types/Diary";

interface DiaryEntryProps {
  data: Diary;
}

const DiaryEntry = ({
  data: { date, visibility, weather, comment },
}: DiaryEntryProps) => {
  return (
    <>
      <h3>{date}</h3>
      <div>visibility: {visibility}</div>
      <div>weather: {weather}</div>
      <div>comment: {comment}</div>
    </>
  );
};
export default DiaryEntry;
