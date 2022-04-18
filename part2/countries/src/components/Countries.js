import Country from './Country'

const Countries = ({ filter, countries }) => {
  const filteredCountries =
    filter.trim() === ''
      ? []
      : countries.filter((country) => {
          return country.name.common.toLowerCase().startsWith(filter.toLowerCase())
        })

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }

  return (
    <ul>
      {filteredCountries.map((country) => {
        return <li key={country.cca3}>{country.name.common}</li>
      })}
    </ul>
  )
}

export default Countries
