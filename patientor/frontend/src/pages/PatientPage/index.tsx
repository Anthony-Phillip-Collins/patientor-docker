import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    console.log(diagnoseEntryForm.current);
  };

  const diagnoseEntryForm = createRef<Ref>();

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
      <h3>
        {patient?.name} {patient?.gender && <GenderIcon gender={patient.gender} />}
      </h3>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      <DiagnoseEntryForm onSubmit={onFormSubmit} errorMessage={errorMessage} ref={diagnoseEntryForm} />

      <h4>entries</h4>
      {patient?.entries?.map((entry) => (
        <DiagnosisEntry entry={entry} key={entry.id} />
      ))}
      <Button variant="contained" color="primary">
        ADD NEW ENTRY
      </Button>
    </>
  );
};

export default PatientPage;
