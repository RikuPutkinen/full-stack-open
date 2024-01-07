import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './components/search'
import ResultList from './components/result-list'
import CountryView from './components/country-view'
import getCountry from './lib/get-country'

function App() {
  const [query, setQuery] = useState('')
  const [countryArr, setCountryArr] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const resultsArr = countryArr.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))

  console.log("RA", resultsArr)
  console.log("SEL", selectedCountry)
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => res.data)
      .then(data => setCountryArr(data))
  }, [])

  useEffect(() => {
    console.log("RES")
    if (resultsArr.length === 1) {
      getCountry(resultsArr[0].name.common, data => setSelectedCountry(data))
      
    }
    else setSelectedCountry(null)
  }, [query])

  return (
    <>
      <Search query={query} handleChange={e => setQuery(e.target.value)} />
      {query && selectedCountry == null && <ResultList results={resultsArr} setter={setSelectedCountry}/>}
      {selectedCountry && <CountryView country={selectedCountry} />}
    </>
  )
}

export default App
