import express from 'express';
import patientService from '../services/patientService';
import {  toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    return response.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (request, response) => {
    try {
        const patient = patientService.getPatientInfo(request.params.id);
        response.json(patient);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        response.status(400).send(errorMessage);
    }
});

router.post('/', (request, response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(request.body);

        const addedPatient = patientService.addPatient(newPatient);
        response.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        response.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (request, response) => {
    const patient = patientService.getPatientInfo(request.params.id);

    if (!patient) {
        return response
            .status(404)
            .send({ error: "Sorry, this patient does not exist" });
    }

    try {
        const newEntry = toNewEntry(request.body);
        const savedPatient = patientService.addEntry(newEntry, patient);
        return response.status(201).json(savedPatient);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        return response.status(400).send(errorMessage);
    }

});

export default router;