import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryDetails from "../components/EntryDetails";
import GenderComponent from "../components/Gender";
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
          {patient?.name} <GenderComponent gender={patient?.gender} />
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
            <EntryDetails entry={entry} />
          </div>
        )}
      </div>
    );
};

export default PatientPage;