import { Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { OccupationalHealthcareEntry } from "../../types/Diagnosis";

interface Props {
  employerName: OccupationalHealthcareEntry["employerName"];
  setEmployer(employerName: OccupationalHealthcareEntry["employerName"]): void;
  sickLeave: OccupationalHealthcareEntry["sickLeave"];
  setSickLeave(startDate: string, endDate: string): void;
  validate: boolean;
}

const OccupationalHealthcareFields = ({
  employerName,
  setEmployer,
  sickLeave,
  setSickLeave,
  validate,
}: Props) => {
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>(sickLeave?.startDate || "");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>(sickLeave?.endDate || "");

  useEffect(() => {
    setSickLeave(sickLeaveStartDate, sickLeaveEndDate);
  }, [sickLeaveStartDate, sickLeaveEndDate]);

  return (
    <>
      <TextField
        id="employer"
        label="employer"
        variant="standard"
        sx={{ mb: 3 }}
        onChange={(e) => {
          setEmployer(e.target.value);
        }}
        value={employerName}
        error={validate && employerName === ""}
        helperText={(validate && employerName === "" && "Incorrect entry.") || ""}
      />

      <Typography variant="body1" component="p" mb={1}>
        Sick leave:
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            id="startDate"
            label="Start date"
            variant="standard"
            type="date"
            InputLabelProps={{ shrink: true, required: true }}
            inputProps={{ max: sickLeaveEndDate }}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
            value={sickLeaveStartDate}
            error={validate && sickLeaveStartDate === ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="endDate"
            label="End date"
            variant="standard"
            type="date"
            InputLabelProps={{ shrink: true, required: true }}
            inputProps={{ min: sickLeaveStartDate }}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
            value={sickLeaveEndDate}
            error={validate && sickLeaveEndDate === ""}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OccupationalHealthcareFields;
