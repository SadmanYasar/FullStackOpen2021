export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthCare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  type: EntryType;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Discharge = {
  date: string,
  criteria: string
};

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export type SickLeave = {
  startDate: string,
  endDate: string
};

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown 
  ? Omit<T, K> 
  : never;

// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;