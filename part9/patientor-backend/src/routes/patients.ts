/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientInfo from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientInfo());
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientInfo = toNewPatientInfo(req.body);
    const addedPatient = patientService.addPatient(newPatientInfo);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
