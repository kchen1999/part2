import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryInfo from './CountryInfo'

const App = () => {
  const [country, setCountry] = useState('')
  const [countryData, setCountryData] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(returnedCountries => setCountryData(returnedCountries))
  }, [])

  useEffect(() => {
      setFilteredCountries(countryData.filter(eachCountry => eachCountry['name']['common'].toLowerCase().includes(country.toLowerCase())))
    }, [country])


  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      find countries <input onChange={handleCountryChange}/>
      <CountryInfo setCountry={setCountry} filteredCountries={filteredCountries} />
    </div>
  )
}



export default App;
