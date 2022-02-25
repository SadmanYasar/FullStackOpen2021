import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    return response.send(patientService.getNonSensitivePatients());
});

router.post('/', (request, response) => {
    try {
        const newPatientEntry = toNewPatientEntry(request.body);

        const addedPatient = patientService.addPatient(newPatientEntry);
        response.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        response.status(400).send(errorMessage);
    }
});

export default router;