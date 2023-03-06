import { ChangeEvent, SyntheticEvent, useState } from "react";
import { IDiaryEntryNew } from "../../types/IDiaryEntry";
import { dateToString } from "../../util/DateUtil";
import styles from "./DiaryEntryForm.module.css";

interface IDiaryEntryFormProps {
  onSubmit: (diaryEntryNew: IDiaryEntryNew) => void;
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
        <label>
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

        <fieldset className={styles?.radioButtonsContainer}>
          <legend>visibility</legend>
          <div className={styles?.legend} aria-hidden="true">
            visibility
          </div>
          <div className={styles?.radioButtons}>
            <label>
              <span>great</span>
              <input
                type="radio"
                id="great"
                name="visibility"
                value="great"
                onChange={onVisibilityChange}
              />
            </label>

            <label>
              <span>good</span>
              <input
                type="radio"
                id="good"
                name="visibility"
                value="good"
                onChange={onVisibilityChange}
              />
            </label>

            <label>
              <span>ok</span>
              <input
                type="radio"
                id="ok"
                name="visibility"
                value="ok"
                onChange={onVisibilityChange}
              />
            </label>

            <label>
              <span>poor</span>
              <input
                type="radio"
                id="poor"
                name="visibility"
                value="poor"
                onChange={onVisibilityChange}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className={styles?.radioButtonsContainer}>
          <legend>weather</legend>
          <div className={styles?.legend} aria-hidden="true">
            weather
          </div>
          <div className={styles?.radioButtons}>
            <label>
              <span>sunny</span>
              <input
                type="radio"
                id="sunny"
                name="weather"
                value="sunny"
                onChange={onWeatherChange}
              />
            </label>

            <label>
              <span>rainy</span>
              <input
                type="radio"
                id="rainy"
                name="weather"
                value="rainy"
                onChange={onWeatherChange}
              />
            </label>

            <label>
              <span>cloudy</span>
              <input
                type="radio"
                id="cloudy"
                name="weather"
                value="cloudy"
                onChange={onWeatherChange}
              />
            </label>

            <label>
              <span>stormy</span>
              <input
                type="radio"
                id="stormy"
                name="weather"
                value="stormy"
                onChange={onWeatherChange}
              />
            </label>

            <label>
              <span>windy</span>
              <input
                type="radio"
                id="windy"
                name="weather"
                value="windy"
                onChange={onWeatherChange}
              />
            </label>
          </div>
        </fieldset>

        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryEntryForm;
