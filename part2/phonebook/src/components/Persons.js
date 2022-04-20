import React from 'react'

const Persons = ({ persons, filter }) => {
  const filtered = !filter ? persons : persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {filtered.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default Persons
