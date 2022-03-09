import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();

    const patient = patients[id];

    useEffect(() => {
        const fetchPatient = async () => {
          try {
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch({ type: 'UPDATE_PATIENT', payload: patientFromApi });
          } catch (e) {
            console.error(e);
          }
        };

        if (!patient?.ssn) {
          void fetchPatient();
        }
    }, [id, dispatch]);

    return (
      <div>
        <p>
          {patient?.name} {patient?.gender}
        </p>
        <p>
          snn: {patient?.ssn}
        </p>
        <p>
          occupation: {patient?.occupation}
        </p>
      </div>
    );
};

export default PatientPage;