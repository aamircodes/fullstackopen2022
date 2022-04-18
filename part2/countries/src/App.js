import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [filter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filter={filter} countries={countries} />
    </div>
  )
}

export default App
