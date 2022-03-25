import axios from 'axios';
import { Field, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Grid, Modal, Segment } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import EntryDetails from '../components/EntryDetails';
import GenderComponent from '../components/Gender';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { HealthCheckEntry, HealthCheckRating, Patient } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface EntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel } : EntryFormProps ) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.CriticalRisk,
        description: '',
        date: '',
        specialist: '',
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return(
          <Form className='form ui'>
            <Field
              label='Type'
              placeholder='Type'
              name='type'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
              <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field 
              label='HealthCheckRating'
              placeholder='0-3'
              name='healthCheckRating'
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

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

    const submitNewEntry = async (values: EntryFormValues) => {
      try {
        const { data: newEntry } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(updatePatient(newEntry));
        closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
          console.error(e.response?.data || 'Unknown Error');
          //setError(e.response?.data?.error || 'Unknown error');
      }
    };

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
          onSubmit={submitNewEntry}
        />
        <Button onClick={openModal} primary>Add new entry</Button>
      </div>
    );
};

export default PatientPage;