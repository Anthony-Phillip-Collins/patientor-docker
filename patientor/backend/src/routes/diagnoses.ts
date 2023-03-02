import { Router, Request, Response } from 'express';
import diagnosesData from '../../data/diagnosesData';
import { Diagnose } from '../types/Diagnose';

export const diagnosesRouter = Router();

diagnosesRouter.get('/', (_req: Request, res: Response) => {
  const data: Diagnose[] = diagnosesData;
  return res.status(200).json(data);
});
