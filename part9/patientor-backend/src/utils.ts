import { Entry, Gender, NewPatientEntry } from "./types";

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    gender: unknown,
    occupation: unknown,
    ssn: unknown,
    entries: unknown
};

const toNewPatientEntry = ({ 
    name, 
    dateOfBirth, 
    gender,
    occupation, 
    ssn,
    entries
}: Fields): NewPatientEntry => {
    return {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        ssn: parseSSN(ssn),
        entries: parseEntries(entries)
    };
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
      throw new Error(`Incorrect or missing entries: ${entries}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};

export default toNewPatientEntry;