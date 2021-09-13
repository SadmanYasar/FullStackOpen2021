import React from 'react'

const Persons = ({persons}) => persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
export default Persons