import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HealthCheckRating } from "../../types/Diagnosis";
import { parseHealthCheckRating } from "../../types/utils/parsers/diagnosis";

interface Props {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating(value: HealthCheckRating): void;
  validate: boolean;
}

const HealthCheckFields = ({ healthCheckRating, setHealthCheckRating, validate }: Props) => {
  const healthRatingKeys = Object.keys(HealthCheckRating).filter((key) => isNaN(Number(key)));
  const healthRatingValues = Object.keys(HealthCheckRating).filter((key) => !isNaN(Number(key)));
  const getKeyFromValue = (value: string): string => {
    const indx = Number(value);
    return healthRatingKeys[Math.min(healthRatingKeys.length - 1, Math.max(0, indx))];
  };
  const getRating = () => healthRatingValues.find((value) => Number(value) === Number(healthCheckRating));
  const showError = validate && !getRating();

  return (
    <>
      <FormControl variant="standard" sx={{ mb: 3 }} error={showError}>
        <InputLabel id="health-check-rating">Health check rating*</InputLabel>
        <Select
          labelId="health-check-rating"
          label="Health check rating*"
          id="health-check-rating-select"
          onChange={(e) => {
            setHealthCheckRating(parseHealthCheckRating(e.target.value));
          }}
          value={getRating() || ""}
        >
          {healthRatingValues?.map((v) => (
            <MenuItem key={v} value={v}>
              {getKeyFromValue(v)}
            </MenuItem>
          ))}
        </Select>
        {/* {showError && <FormHelperText>Error</FormHelperText>} */}
      </FormControl>
    </>
  );
};

export default HealthCheckFields;
