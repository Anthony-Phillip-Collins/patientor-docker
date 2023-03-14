import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { forwardRef, useContext, useState } from "react";
import { AppContext, AppContextValue } from "../../App";
import { Diagnosis, HospitalEntry, NewDiagnosisEntry, NewDiagnosisEntryBase } from "../../types/Diagnosis";
import assertNever from "../../types/utils/assertNever";
import HealthCheckFields from "./HealthCheckFields";
import HospitalFields from "./HospitalFields";
import OccupationalHealthcareFields from "./OccupationalHealthcareFields";
import styles from "./styles.module.css";

const formatDate = (date: dayjs.Dayjs): string => date.format("YYYY-MM-DD");

export interface Props {
  onSubmit(data: NewDiagnosisEntry): void;
  errorMessage: string | null;
}

export type Ref = HTMLDivElement;

const DiagnoseEntryForm = forwardRef<Ref, Props>((props, ref) => {
  const { onSubmit, errorMessage } = props;
  const appContext: AppContextValue | null = useContext(AppContext);

  const [type, setType] = useState<NewDiagnosisEntry["type"]>("HealthCheck");

  const [validate, setValidate] = useState(false);

  const getInitialDataByType = (type: NewDiagnosisEntry["type"]): NewDiagnosisEntry => {
    const newEntryBase: NewDiagnosisEntryBase = {
      date: formatDate(dayjs()),
      description: "Something",
      specialist: "Dr. SPecia;l",
      diagnosisCodes: ["J10.1"],
    };

    switch (type) {
      case "HealthCheck":
        return { ...newEntryBase, type, healthCheckRating: -1 };
      case "Hospital":
        return {
          ...newEntryBase,
          type,
          discharge: {
            date: "",
            criteria: "",
          },
        };
      case "OccupationalHealthcare":
        return {
          ...newEntryBase,
          type,
          employerName: "Employa",
          sickLeave: {
            startDate: "2022-12-01",
            endDate: "2022-12-02",
          },
        };
      default:
        return assertNever(type);
    }
  };

  const [data, setData] = useState<NewDiagnosisEntry>(getInitialDataByType(type));

  const onDiagnosisCodeChange = (event: SelectChangeEvent<Diagnosis["code"][]>) => {
    const {
      target: { value },
    } = event;
    const diagnosisCodes = typeof value === "string" ? value.split(",") : value;
    setData({ ...data, diagnosisCodes });
  };

  const availableDiagnoses = appContext?.diagnoses.map(({ code }) => code);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setValidate(true);
    onSubmit(data);
  };

  return (
    <div ref={ref}>
      {errorMessage && errorMessage !== "" && (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        </>
      )}

      <form className={styles?.form} onSubmit={handleSubmit}>
        <TextField
          id="description"
          label="Description"
          variant="standard"
          sx={{ mb: 3 }}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          value={data.description}
          error={validate && data.description === ""}
        />

        <TextField
          id="specialist"
          label="Specialist"
          variant="standard"
          sx={{ mb: 3 }}
          onChange={(e) => setData({ ...data, specialist: e.target.value })}
          value={data.specialist}
          error={validate && data.specialist === ""}
        />

        <TextField
          id="date"
          label="Date"
          variant="standard"
          sx={{ mb: 3 }}
          type="date"
          InputLabelProps={{ shrink: true, required: true }}
          onChange={(e) => setData({ ...data, date: e.target.value })}
          value={data.date}
          error={validate && data.date === ""}
        />

        <FormControl variant="standard" sx={{ mb: 3 }}>
          <InputLabel id="diagnosis-codes">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes"
            id="diagnosis-codes-select"
            onChange={onDiagnosisCodeChange}
            value={data.diagnosisCodes}
            label="Diagnosis codes"
            multiple
          >
            {availableDiagnoses?.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {data.type === "OccupationalHealthcare" && (
          <OccupationalHealthcareFields
            employerName={data.employerName}
            setEmployer={(employerName) => {
              setData({ ...data, employerName });
            }}
            sickLeave={data.sickLeave}
            setSickLeave={(startDate: string, endDate: string) => {
              setData({
                ...data,
                sickLeave: {
                  startDate,
                  endDate,
                },
              });
            }}
            validate={validate}
          />
        )}

        {data.type === "Hospital" && (
          <>
            <HospitalFields
              discharge={data.discharge}
              setDischarge={(discharge: HospitalEntry["discharge"]) => {
                setData({ ...data, discharge: { ...discharge } });
              }}
              validate={validate}
            />
          </>
        )}

        {data.type === "HealthCheck" && (
          <>
            <HealthCheckFields
              healthCheckRating={data.healthCheckRating}
              setHealthCheckRating={(value) => {
                setData({ ...data, healthCheckRating: value });
              }}
              validate={validate}
            />
          </>
        )}

        <Grid container direction="row" justifyContent="space-between" alignItems="center" mt={5}>
          <Grid item>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
});

DiagnoseEntryForm.displayName = "DiagnoseEntryForm";

export default DiagnoseEntryForm;
