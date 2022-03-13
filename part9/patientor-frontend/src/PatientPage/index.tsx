import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
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
            dispatch(updatePatient(patientFromApi));
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
        <h2>
          {patient?.name} {patient?.gender}
        </h2>
        <p>
          snn: {patient?.ssn}
        </p>
        <p>
          occupation: {patient?.occupation}
        </p>
        <b>entries</b>
        {patient?.entries.map((entry, i) => 
          <div key={i}>
            <p>{entry.date} {entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map(d => 
                <li key={d}>
                  {d}
                </li>)}
            </ul>
          </div>
        )}
      </div>
    );
};

export default PatientPage;