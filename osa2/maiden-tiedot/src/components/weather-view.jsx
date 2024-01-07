import axios from "axios"
import { useState, useEffect } from "react"

const API_KEY = import.meta.env.VITE_API_KEY

export default function WeatherView({ city }) {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(res => setWeatherData(res.data))
  }, [])

  function round(num, d) {
    return Math.round(num * 10**d) / 10**d
  }

  if (!weatherData) return null

  const cityName = weatherData.name
  const temperature = weatherData.main.temp - 273.15
  const imgURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  const imgAlt = weatherData.weather[0].description
  const wind = weatherData.wind.speed

  return (
    <div>
      <h2>Weather in {cityName}</h2>
      <p>Temperature {round(temperature, 2)} Celcius</p>
      <div>
        <img src={imgURL} alt={imgAlt}/>
      </div>
      <p>Wind {wind} m/s</p>
    </div>
  )
}