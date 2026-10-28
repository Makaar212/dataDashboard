import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CITIES from './data/cities'
import Dashboard from './pages/Dashboard'

function App() {
  const [weather, setWeather] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const latitudes = CITIES.map((city) => city.latitude).join(',')
      const longitudes = CITIES.map((city) => city.longitude).join(',')
      const url =
        'https://api.open-meteo.com/v1/forecast' +
        `?latitude=${latitudes}&longitude=${longitudes}` +
        '&current=temperature_2m' +
        '&daily=precipitation_probability_max,sunshine_duration' +
        '&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&forecast_days=1'

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()

        // Open-Meteo returns one result per city, in the same order as CITIES
        setWeather(
          data.map((result, i) => ({
            city: CITIES[i].name,
            temperature: result.current.temperature_2m,
            chanceOfRain: result.daily.precipitation_probability_max[0],
            hoursOfSun: (result.daily.sunshine_duration[0] / 3600).toFixed(1),
          }))
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard weather={weather} loading={loading} error={error} />}
      />
    </Routes>
  )
}

export default App
