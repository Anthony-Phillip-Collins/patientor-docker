import { TextField, Typography } from "@mui/material";
import { HospitalEntry } from "../../types/Diagnosis";

interface Props {
  discharge: HospitalEntry["discharge"];
  setDischarge(discharge: HospitalEntry["discharge"]): void;
  validate: boolean;
}

const HospitalFields = ({ discharge, setDischarge, validate }: Props) => {
  return (
    <>
      <Typography variant="body1" component="p" mb={1}>
        Discharge:
      </Typography>

      <TextField
        id="criteria"
        label="Criteria"
        variant="standard"
        sx={{ mb: 3 }}
        InputLabelProps={{ required: true }}
        onChange={(e) => {
          setDischarge({ ...discharge, criteria: e.target.value });
        }}
        value={discharge.criteria}
        error={validate && discharge.criteria === ""}
        // helperText={(validate && discharge.criteria === "" && "Incorrect entry.") || ""}
      />

      <TextField
        id="dischargeDate"
        label="Date"
        variant="standard"
        type="date"
        InputLabelProps={{ shrink: true, required: true }}
        onChange={(e) => {
          setDischarge({ ...discharge, date: e.target.value });
        }}
        value={discharge.date}
        error={validate && discharge.date === ""}
        fullWidth
      />
    </>
  );
};

export default HospitalFields;
