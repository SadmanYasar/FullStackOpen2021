import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import SearchFilter from './Components/SearchFilter'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newSearchName, setNewSearchName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ Message, setMessage ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => setMessage(`Could not get data. Server response: ${error.response.status} ${error.response.statusText}`))
  }, [])

  useEffect(() => {
    switch (newSearchName) {
      case "":
        setFilter(persons)
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
      setMessage("Empty field(s) detected!")

      setTimeout(() => {
        setMessage(null)
      }, 1000);
      return
    }

    const matches = persons.filter((person) => person.name === newName)

    if ( matches.length !== 0 ) {
      if ( window.confirm(`${matches[0].name} already added to phonebook. Replace the old number with a new one?`) ) {
        personService
          .update(matches[0].id, {...matches[0], number: newNumber})
          .then((updatedPerson) => {
            setPersons(persons.map((person) => person.id === matches[0].id ? updatedPerson : person ))
            setNewName('')
            setNewNumber('')
            setMessage(`${updatedPerson.name} has been successfully updated`)

            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
          .catch((error) => {
            setMessage(`${matches[0].name} was already removed from server`)

            setPersons(persons.filter((person) => person.id !== matches[0].id))
            setNewName('')
            setNewNumber('')

            setTimeout(() => {
              setMessage(null)
            }, 5000);

            

          })
      }
      return
    }

    const NewNameObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(NewNameObject)
      .then((updatedPerson) => {
        setPersons(persons.concat(updatedPerson))
        setNewName('')
        setNewNumber('') 
        setMessage(`${updatedPerson.name} has been added`)

        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
      .catch((error) => {
        setMessage(`Error! Server says: ${error.response.status} ${error.response.statusText}`)
      
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
    

  }

  const DeletePerson = (id) => {
    const name = filter.find((person) => person.id === id).name
    
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .makeDelete(id)
      .then((emptyObject) => {
        setPersons(persons.filter((person) => person.id !== id))

        setMessage(`${name} has been deleted`)

        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
      .catch((error) => {
        setMessage(`Error! Server says: ${error.response.status} ${error.response.statusText}`)
      
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
    }
    
      
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={Message} />

      <SearchFilter value={newSearchName} onChange={HandleSearchName} />

      <h2>Add a new</h2>
      <PersonForm onSubmit={HandleSubmit} name={newName} nameOnChange={HandleNewName} number={newNumber} numberOnChange={HandleNewNumber} />
      
      <h2>Numbers</h2>
      
      <Persons persons={filter} deletePerson = {DeletePerson}/>
    
    </div>
  )
}

export default App
