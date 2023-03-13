import { Router, Request, Response } from 'express';
import patientService from '../services/patientService';
import { parseNewDiagnosisEntry } from '../types/utils/parsers/diagnosis';
import { parseNewPatient } from '../types/utils/parsers/patient';

export const patientsRouter = Router();

patientsRouter.get('/', (_req: Request, res: Response) => {
  const data = patientService.getPatientsNonSensitive();
  return res.status(200).json(data);
});

patientsRouter.get('/:id', (req: Request, res: Response) => {
  const data = patientService.getPatientById(req.params.id);
  return res.status(200).json(data);
});

patientsRouter.post('/', (req: Request, res: Response) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const patient = patientService.addPatient(newPatient);
    return res.status(200).json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Patient data is invalid!' });
  }
});

patientsRouter.post('/:id/entries', (req: Request, res: Response) => {
  try {
    const newDiagnosisEntry = parseNewDiagnosisEntry(req.body);
    const diagnosisEntry = patientService.addDiagnosisEntry(
      newDiagnosisEntry,
      req.params.id
    );
    return res.status(200).json(diagnosisEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Diagnosis data is invalid!' });
  }
});
