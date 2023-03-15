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
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { AppContext, AppContextValue } from "../../App";
import { Diagnosis, HospitalEntry, NewDiagnosisEntry, NewDiagnosisEntryBase } from "../../types/Diagnosis";
import assertNever from "../../types/utils/assertNever";
import HealthCheckFields from "./HealthCheckFields";
import HospitalFields from "./HospitalFields";
import OccupationalHealthcareFields from "./OccupationalHealthcareFields";
import styles from "./styles.module.css";

export interface Props {
  onSubmit(data: NewDiagnosisEntry): void;
  onCancel(): void;
  errorMessage: string | null;
  type: NewDiagnosisEntry["type"];
  setType(type: NewDiagnosisEntry["type"]): void;
}

export type Ref = { reset(): void };

const DiagnoseEntryForm = forwardRef<Ref, Props>((props, ref) => {
  const { onSubmit, onCancel, errorMessage, type, setType } = props;
  const appContext: AppContextValue | null = useContext(AppContext);
  const [validate, setValidate] = useState(false);
  const diagnosisTypes: Array<{ type: NewDiagnosisEntry["type"]; label: string }> = [
    { type: "HealthCheck", label: "Health Check" },
    { type: "Hospital", label: "Hospital" },
    { type: "OccupationalHealthcare", label: "Occupational Healthcare" },
  ];

  const getInitialData = (): NewDiagnosisEntry => {
    const newEntryBase: NewDiagnosisEntryBase = {
      date: "",
      description: "",
      specialist: "",
      diagnosisCodes: [],
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
          employerName: "",
          sickLeave: {
            startDate: "",
            endDate: "",
          },
        };
      default:
        return assertNever(type);
    }
  };

  const [data, setData] = useState<NewDiagnosisEntry>(getInitialData());

  const reset = () => {
    setValidate(false);
    setData({ ...getInitialData() });
  };

  useImperativeHandle(ref, () => ({ reset }), []);

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

  useEffect(() => {
    reset();
  }, [type]);

  return (
    <div>
      {errorMessage && errorMessage !== "" && (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        </>
      )}

      <form className={styles?.form} onSubmit={handleSubmit}>
        <FormControl variant="standard" sx={{ mb: 3 }} fullWidth>
          <InputLabel id="diagnosis-type">Diagnosis Type</InputLabel>
          <Select
            labelId="diagnosis-type"
            label="Diagnosis Type"
            id="diagnosis-type-select"
            onChange={(e) => {
              const item = diagnosisTypes.find(({ type }) => type.toString() === e.target.value);
              if (item?.type) {
                setType(item.type);
              }
            }}
            value={type || ""}
          >
            {diagnosisTypes?.map(({ type, label }) => (
              <MenuItem key={label} value={type}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="description"
          label="Description"
          variant="standard"
          sx={{ mb: 3 }}
          InputLabelProps={{ required: true }}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          value={data.description}
          error={validate && data.description === ""}
        />

        <TextField
          id="specialist"
          label="Specialist"
          variant="standard"
          sx={{ mb: 3 }}
          InputLabelProps={{ required: true }}
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
            sickLeave={data?.sickLeave}
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
            <Button variant="contained" color="error" onClick={() => onCancel()}>
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
