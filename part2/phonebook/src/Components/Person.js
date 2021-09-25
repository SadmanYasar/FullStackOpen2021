import React from 'react'

const Person = ({person, deletePerson}) => 
    <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button></p>
export default Person