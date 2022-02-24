import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_request, response) => {
    return response.send(patientService.getNonSensitivePatients());
});

export default router;