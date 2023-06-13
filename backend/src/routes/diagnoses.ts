import { Router, Request, Response } from 'express';
import DiagnosisModel from '../mongo/models/Diagnosis';

export const diagnosesRouter = Router();

diagnosesRouter.get('/', (_req: Request, res: Response) => {
  DiagnosisModel.find({})
    .then((diagnoses) => {
      res.status(200).json(diagnoses);
    })
    .catch((e: Error) => {
      res.status(400).json({ error: e.message });
    });
});
