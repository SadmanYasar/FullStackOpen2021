import React from 'react'
import Person from './Person'

const Persons = ({persons, deletePerson}) => persons.map((person,i) => 
                    <Person key={i} person={person} deletePerson={deletePerson} />)
export default Persons