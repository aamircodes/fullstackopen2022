import { useState, useEffect } from 'react'

import Filter from './components/Filter'
const App = () => {
  const [filter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
    </div>
  )
}

export default App
