import patients from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatientInfo = (id: string) => {
    const patient = patients.find(p => id === p.id);
    if (!patient) {
        throw new Error('Invalid ID');
    }

    return patient;
};

const generateId = (): string => {
    /* eslint-disable-next-line 
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-unsafe-call */
    return uuid();
};

const addPatient = (entry: NewPatientEntry): Patient => {
    return {
        id: generateId(),
        ...entry
    };
};

export default {
    getNonSensitivePatients,
    getPatientInfo,
    addPatient
};