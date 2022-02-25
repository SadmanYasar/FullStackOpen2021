import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_request, response) => {
    return response.send(patientService.getNonSensitivePatients());
});

router.post('/', (request, response) => {
    //take req.body 
    //send it to services for type checking
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const addedPatient = patientService.addPatient(request.body);
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