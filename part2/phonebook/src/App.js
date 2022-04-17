import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }

<<<<<<< HEAD
    if (persons.some((person) => person.name === personObject.name)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

=======
>>>>>>> 137c31a305341055934175c86f651cffa229dcf0
    setPersons(persons.concat(personObject))
    setNewName('')
  }

<<<<<<< HEAD
  const handlePersonChange = (event) => {
=======
  const handleNameChange = (event) => {
>>>>>>> 137c31a305341055934175c86f651cffa229dcf0
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
<<<<<<< HEAD
          name: <input value={newName} onChange={handlePersonChange} />
=======
          name: <input value={newName} onChange={handleNameChange} />
>>>>>>> 137c31a305341055934175c86f651cffa229dcf0
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
<<<<<<< HEAD
      <div>
        {persons.map((person) => (
          <div key={person.name}>{person.name} </div>
        ))}
      </div>
=======
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
>>>>>>> 137c31a305341055934175c86f651cffa229dcf0
    </div>
  )
}

export default App
