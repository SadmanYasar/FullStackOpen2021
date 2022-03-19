/* eslint-disable @typescript-eslint/no-explicit-any */
import { Discharge, EntryType, Gender, HealthCheckRating, NewBaseEntry, NewEntry, NewPatient, SickLeave } from "./types";

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    gender: unknown,
    occupation: unknown,
    ssn: unknown,
    entries: unknown
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const toNewPatient = ({ 
    name, 
    dateOfBirth, 
    gender,
    occupation, 
    ssn,
}: Fields): NewPatient => {
    return {
        name: parseToString(name, 'name'),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseToString(occupation, 'occupation'),
        ssn: parseToString(ssn, 'ssn'),
    };
};

type BaseEntryFields = {
    description: unknown,
    date: unknown,
    type: unknown,
    specialist: unknown,
    diagnosisCodes?: unknown
};

const toNewBaseEntry = ({
    description,
    date,
    type,
    specialist,
    diagnosisCodes
}: BaseEntryFields): NewBaseEntry => {
    const newBaseEntry: NewBaseEntry = {
        description: parseToString(description, 'description'),
        date: parseDate(date),
        type: parseType(type),
        specialist: parseToString(specialist, 'specialist')
    };

    if (diagnosisCodes) {
        newBaseEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
    }

    return newBaseEntry;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
    if (!codes || !isStringArray(codes)) {
        throw new Error('Invalid or missing diagnosis codes');
    }

    return codes;
};

const parseType = (type: unknown): EntryType => {
    if (!type || !isEntryType(type)) {
        throw new Error('Invalid or missing type');
    }

    return type;
};

const isEntryType = (type: any): type is EntryType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(type);
};

const isStringArray = (arr: unknown): arr is string[] => {
    if (!Array.isArray(arr)) {
        return false;
    }

    if (arr.some((value) => typeof value !== "string")) {
        return false;
    }

    return true;
};

export const toNewEntry = (obj: any): NewEntry => {
    if (!obj) {
        throw new Error('No entry given');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newBaseEntry = toNewBaseEntry(obj);

    switch (newBaseEntry.type) {
        case EntryType.HealthCheck:
            return {
                ...newBaseEntry,
                type: EntryType.HealthCheck,
                healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
            };

        case EntryType.Hospital:
            return {
                ...newBaseEntry,
                type: EntryType.Hospital,
                discharge: parseDischarge(obj.discharge)
            };
    
        case EntryType.OccupationalHealthCare:
            const newEntry: NewEntry = {
                ...newBaseEntry,
                type: EntryType.OccupationalHealthCare,
                employerName: parseToString(obj.employerName, 'employername'),
            };

            if (obj.sickLeave) {
                newEntry.sickLeave = parseSickLeave(obj.sickLeave);
            }

            return newEntry;

        default:
            return assertNever(newBaseEntry.type);
    }
};

const parseSickLeave = (obj: any): SickLeave => {
    if (!obj) throw new Error("Missing sick leave");

    return {
        startDate: parseDate(obj.startDate),
        endDate: parseDate(obj.endDate)
    };
};

const parseDischarge = (obj: any): Discharge => {
    if (!obj) throw new Error("Missing discharge");

    return {
        criteria: parseToString(obj.criteria, 'criteria'),
        date: parseDate(obj.date)
    };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error('Invalid or missing health check rating');
    }

    return rating;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(rating);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const parseToString = (str: unknown, name: string): string => {
    if(!str || !isString(str)) {
        throw new Error(`Incorrect or missing ${name}`);
    }

    return str;
};