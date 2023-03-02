import { Router, Request, Response } from 'express';
import patientsData from '../../data/patientsData';
import { PatientSafe } from '../types';

export const patientsRouter = Router();

patientsRouter.get('/', (_req: Request, res: Response) => {
  const data: PatientSafe[] = patientsData.map((patient) => {
    const p = { ...patient };
    delete p.ssn;
    return p;
  });
  return res.status(200).json(data);
});
