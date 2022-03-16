import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';

interface EntryDetailsProps {
    entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <>
            <p>{entry.date} {entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map(d => 
                <li key={d}>
                  {d} {diagnoses[d]?.name}
                </li>)}
            </ul>
        </>
    );
};

export default EntryDetails;
