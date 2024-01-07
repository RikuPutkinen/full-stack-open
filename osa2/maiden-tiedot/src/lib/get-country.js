import axios from "axios"

export default function getCountry(name, cb) {
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then(res => res.data)
    .then(cb)
}