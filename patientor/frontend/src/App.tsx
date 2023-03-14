import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

import { apiBaseUrl } from "./constants";

import patientService from "./services/patientServices";
import PatientListPage from "./pages/PatientListPage";
import PatientPage from "./pages/PatientPage";
import { Patient } from "./types/Patient";
import { Diagnosis } from "./types/Diagnosis";
import diagnosisService from "./services/diagnosisService";

export interface AppContextValue {
  patients: Patient[];
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export const AppContext = createContext<AppContextValue | null>(null);

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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

    const fetchDiagnosis = async () => {
      try {
        const d = await diagnosisService.getAll();
        setDiagnoses(d);
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    };

    fetchDiagnosis();
  }, []);

  return (
    <div className="App">
      <Router>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
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
        </LocalizationProvider>
      </Router>
    </div>
  );
};

export default App;
