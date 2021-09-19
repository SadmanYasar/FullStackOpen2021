import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import SearchFilter from './Components/SearchFilter'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [filter, setFilter] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newSearchName, setNewSearchName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  useEffect(() => {
    switch (newSearchName) {
      case "":
        setFilter([])
        break;
    
      default:
        //removes white space for each name
        //then turns to lowercase
        //then index compared to -1
        setFilter(persons.filter((person) => 
        person.name
        .split(/\s+/)
        .join('')
        .toLowerCase()
        .indexOf(newSearchName
          .split(/\s+/)
          .join('')
          .toLowerCase()) !== -1))
        break;
    }

  }, [newSearchName, persons])



  const HandleNewName = (event) => {
    const newName = event.target.value
    setNewName(newName)
  }

  const HandleSearchName = (event) => {
    const newSearchName = event.target.value
    setNewSearchName(newSearchName)
  }

  const HandleNewNumber = (event) => {
    const newNumber = event.target.value
    setNewNumber(newNumber)
  }

  const HandleSubmit = (event) => {
    event.preventDefault()

    if ( newName === "" || newNumber === "" ) {
      alert("Empty field(s) detected!")
      return
    }

    const nameOfPersons = persons.map((person) => person.name)
    const PersonsNumbers = persons.map((person) => person.number)

    if ( nameOfPersons.indexOf(newName) === -1 && PersonsNumbers.indexOf(newNumber) === -1 ) {
      const NewNameObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(NewNameObject)) 
      setNewName('')
      setNewNumber('')

    } else if ( nameOfPersons.indexOf(newName) !== -1 && PersonsNumbers.indexOf(newNumber) !== -1 ) {
      alert(`${newName} and ${newNumber} is already added to phonebook`)

    } else if ( nameOfPersons.indexOf(newName) !== -1 && PersonsNumbers.indexOf(newNumber) === -1 ) {
      alert(`${newName} is already added to phonebook`)

    } else if ( nameOfPersons.indexOf(newName) === -1 && PersonsNumbers.indexOf(newNumber) !== -1 ) {
      alert(`${newNumber} is already added to phonebook`)
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={newSearchName} onChange={HandleSearchName} />

      <h2>Add a new</h2>
      <PersonForm onSubmit={HandleSubmit} name={newName} nameOnChange={HandleNewName} number={newNumber} numberOnChange={HandleNewNumber} />
      
      <h2>Numbers</h2>
      <Persons persons={filter} />
    </div>
  )
}

export default App
