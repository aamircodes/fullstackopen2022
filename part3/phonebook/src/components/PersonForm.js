import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        name: <input value={newName} onChange={handleNameChange} />
        <div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>

          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
