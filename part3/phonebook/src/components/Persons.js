import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map((filteredPerson) => (
          <Person key={filteredPerson.name} person={filteredPerson} deletePerson={deletePerson} />
        ))}
    </ul>
  )
}

export default Persons
