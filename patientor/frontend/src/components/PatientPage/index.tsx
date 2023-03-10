import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientServices from "../../services/patientServices";
import { Patient } from "../../types/Patient";
import DiagnoseEntry from "../DiagnoseEntry";

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
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

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
        {patient?.name}{" "}
        {patient?.gender && <GenderIcon gender={patient.gender} />}
      </h3>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      <h4>entries</h4>
      {patient?.entries.map((entry) => (
        <DiagnoseEntry entry={entry} key={entry.id} />
      ))}
      <Button variant="contained" color="primary">
        ADD NEW ENTRY
      </Button>
    </>
  );
};

export default PatientPage;
