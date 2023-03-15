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

  useEffect(() => {
    if (sickLeave) {
      if (sickLeave?.startDate !== sickLeaveStartDate) {
        setSickLeaveStartDate(sickLeave.startDate);
      }
      if (sickLeave?.endDate !== sickLeaveEndDate) {
        setSickLeaveEndDate(sickLeave.endDate);
      }
    }
  }, [sickLeave]);

  return (
    <>
      <TextField
        id="employer"
        label="employer"
        variant="standard"
        sx={{ mb: 3 }}
        InputLabelProps={{ required: true }}
        onChange={(e) => {
          setEmployer(e.target.value);
        }}
        value={employerName}
        error={validate && employerName === ""}
        // helperText={(validate && employerName === "" && "Incorrect entry.") || ""}
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
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: sickLeaveEndDate }}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
            value={sickLeaveStartDate}
            error={validate && !Date.parse(sickLeaveStartDate) && !!Date.parse(sickLeaveEndDate)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="endDate"
            label="End date"
            variant="standard"
            type="date"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: sickLeaveStartDate }}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
            value={sickLeaveEndDate}
            error={validate && !Date.parse(sickLeaveEndDate) && !!Date.parse(sickLeaveStartDate)}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OccupationalHealthcareFields;
