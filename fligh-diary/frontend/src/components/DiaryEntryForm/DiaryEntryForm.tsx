import { ChangeEvent, SyntheticEvent, useState } from "react";
import { IDiaryEntryNew } from "../../types/IDiaryEntry";
import { dateToString } from "../../util/DateUtil";
import styles from "./DiaryEntryForm.module.css";

interface IDiaryEntryFormProps {
  onSubmit: (a: IDiaryEntryNew) => void;
}

const DiaryEntryForm = ({ onSubmit }: IDiaryEntryFormProps) => {
  const [date, setDate] = useState<string>(dateToString(new Date()));
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const onVisibilityChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setVisibility(input.value);
  };

  const onWeatherChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setWeather(input.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (onSubmit) {
      const diaryEntryNew: IDiaryEntryNew = {
        date,
        visibility,
        weather,
        comment,
      };
      onSubmit(diaryEntryNew);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles?.form}>
        <label htmlFor="date">
          <span>date</span>
          <input
            type="date"
            id="date"
            name="date"
            min="2018-01-01"
            max={dateToString(new Date())}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </label>
        <label htmlFor="visibility">
          <span>visibility</span>
          <input
            type="text"
            id="visibility"
            name="visibility"
            value={visibility}
            onChange={onVisibilityChange}
          ></input>
        </label>
        <label htmlFor="weather">
          <span>weather</span>
          <input
            type="text"
            id="weather"
            name="weather"
            value={weather}
            onChange={onWeatherChange}
          ></input>
        </label>
        <label htmlFor="comment">
          <span>comment</span>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></input>
        </label>
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default DiaryEntryForm;
