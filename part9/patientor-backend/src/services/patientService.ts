import patients from "../../data/patients";
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";
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

const getPatientInfo = (id: string): Patient => {
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

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: generateId(),
        entries: [] as Entry[],
        ...entry
    };

    return newPatient;
};

const addEntry = (entry: NewEntry, patient: Patient): Patient => {
    const newEntry: Entry = {...entry, id: generateId()};
    const savedPatient: Patient = {
        ...patient, 
        entries: patient.entries.concat(newEntry)
    };

    return savedPatient;
};

export default {
    getNonSensitivePatients,
    getPatientInfo,
    addPatient,
    addEntry
};