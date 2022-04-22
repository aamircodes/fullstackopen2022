import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find((p) => p.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id !== person.id ? p : returnedPerson)))
            setNewName('')
            setNewNumber('')
            setMessage(`${updatedPerson.name} was successfully updated`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            console.log(error)
            setPersons(persons.filter((p) => p.id !== updatedPerson.id))
            setNewName('')
            setNewNumber('')
            setMessage(`[ERROR] ${updatedPerson.name} was already deleted from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const nameObj = {
        name: newName,
        number: newNumber,
      }

      personService.create(nameObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`delete ${person.name}?`)) {
      personService
        .deleteIt(person.id)
        .then((response) => setMessage(`deleted ${person.name}`))
        .catch((error) => {
          setMessage(`Issue deleting ${person.name}`)
        })
      setPersons(persons.filter((p) => p.id !== id))
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
