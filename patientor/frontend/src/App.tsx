import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";

import patientService from "./services/patientServices";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import { Patient } from "./types/Patient";
import { Diagnose } from "./types/Diagnose";
import diagnosesService from "./services/diagnoseService";

interface AppContextValue {
  patients: Patient[];
  diagnoses: Diagnose[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export const AppContext = createContext<AppContextValue | null>(null);

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const p = await patientService.getAll();
        setPatients(p);
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    };
    fetchPatientList();

    const fetchDiagnoses = async () => {
      try {
        const d = await diagnosesService.getAll();
        setDiagnoses(d);
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    };

    fetchDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <AppContext.Provider value={{ patients, diagnoses, setPatients }}>
          <Container>
            <Typography
              variant="h3"
              style={{
                marginBottom: "0.5em",
              }}
            >
              Patientor
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Divider hidden />
            <Routes>
              <Route path="/" element={<PatientListPage />} />
              <Route path="patients/:id" element={<PatientPage />} />
            </Routes>
          </Container>
        </AppContext.Provider>
      </Router>
    </div>
  );
};

export default App;
