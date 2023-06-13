import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Button, Collapse, Fade, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AxiosError } from "axios";
import { createRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DiagnosisEntry from "../../components/DiagnoseEntry";
import DiagnoseEntryForm, { Ref } from "../../components/DiagnoseEntryForm";
import patientServices from "../../services/patientServices";
import { NewDiagnosisEntry } from "../../types/Diagnosis";
import { Patient } from "../../types/Patient";

interface GenderIconProps {
  gender: "male" | "female" | "other";
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case "female":
      return <FemaleIcon />;
    case "male":
      return <MaleIcon />;
    default:
      return null;
  }
};

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState("");
  const diagnoseEntryForm = createRef<Ref>();
  const [diagnosisType, setDiagnosisType] = useState<NewDiagnosisEntry["type"]>("HealthCheck");
  const [showForm, setShowForm] = useState(false);

  const onFormSubmit = async (data: NewDiagnosisEntry) => {
    if (!patient) return;

    try {
      const entry = await patientServices.addDiagnosisEntry(patient.id, data);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      resetForm();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.error);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        console.log("Something went wrong");
      }
    }
  };

  const resetForm = () => {
    setErrorMessage("");
    diagnoseEntryForm.current?.reset();
    setShowForm(false);
  };

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        try {
          const p = await patientServices.getById(id);
          if (p) {
            setPatient(p);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadData();
  }, [id]);

  return (
    <>
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>

      <Box component="div" sx={{ mt: 4, mb: 3, p: 0, border: "none" }}>
        <Typography variant="h5" component="h2">
          {patient?.name} {patient?.gender && <GenderIcon gender={patient.gender} />}
        </Typography>

        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>
      </Box>

      <Collapse in={showForm}>
        <Box sx={{ mb: 3 }}>
          <DiagnoseEntryForm
            onSubmit={onFormSubmit}
            onCancel={() => setShowForm(false)}
            errorMessage={errorMessage}
            ref={diagnoseEntryForm}
            type={diagnosisType}
            setType={setDiagnosisType}
          />
        </Box>
      </Collapse>

      <Typography variant="h6" component="h3">
        entries
      </Typography>

      {patient?.entries?.map((entry) => (
        <DiagnosisEntry entry={entry} key={entry.id} />
      ))}
      <Fade in={!showForm}>
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
          ADD NEW ENTRY
        </Button>
      </Fade>
    </>
  );
};

export default PatientPage;
