import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload
          }
        }
      };
    
    case "SET_DIAGNOSE_LIST": 
    return {
      ...state,
      diagnoses: {
        ...action.payload.reduce(
          (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
          {}
        ),
        ...state.diagnoses
      }
    };

    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: data,
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: data
  };
};

export const updatePatient = (data: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: data
  };
};

export const setDiagnoseList = (data: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSE_LIST",
    payload: data
  };
};
