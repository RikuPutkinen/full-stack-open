import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './components/search'
import ResultList from './components/result-list'
import CountryView from './components/country-view'

function App() {
  const [query, setQuery] = useState('')
  const [countryArr, setCountryArr] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const resultsArr = countryArr.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => res.data)
      .then(data => setCountryArr(data))
  }, [])

  useEffect(() => {
    if (resultsArr.length === 1) {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${resultsArr[0].name.common}`)
      .then(res => res.data)
      .then(data => setSelectedCountry(data))
      
    }
    else setSelectedCountry(null)
  }, [resultsArr])

  return (
    <>
      <Search query={query} handleChange={e => setQuery(e.target.value)} />
      {query && <ResultList results={resultsArr} />}
      {selectedCountry && <CountryView country={selectedCountry} />}
    </>
  )
}

export default App
