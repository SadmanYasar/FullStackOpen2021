import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Segment } from "semantic-ui-react";
import EntryDetails from "../components/EntryDetails";
import GenderComponent from "../components/Gender";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  /**
   * onsubmit should take entryform values
   */
  //onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, /* onSubmit, */ error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {/* <AddPatientForm onSubmit={onSubmit} onCancel={onClose} /> */}
    </Modal.Content>
  </Modal>
);


const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const patient = patients[id];

    /**
     * On submit function add here
     */

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
        <AddEntryModal 
          modalOpen={modalOpen}
          onClose={closeModal}
          error={error}
          //onsubmit
        />
        <Button onClick={openModal} primary>ADD NEW ENTRY</Button>
      </div>
    );
};

export default PatientPage;