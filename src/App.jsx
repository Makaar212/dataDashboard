import { useEffect, useState } from 'react'
import './App.css'
import SummaryCard from './components/SummaryCard'
import WeatherRow from './components/WeatherRow'

const CITIES = [
  { name: 'Seattle', latitude: 47.6062, longitude: -122.3321 },
  { name: 'Spokane', latitude: 47.6588, longitude: -117.426 },
  { name: 'Tacoma', latitude: 47.2529, longitude: -122.4443 },
  { name: 'Vancouver', latitude: 45.6387, longitude: -122.6615 },
  { name: 'Bellevue', latitude: 47.6101, longitude: -122.2015 },
  { name: 'Everett', latitude: 47.979, longitude: -122.2021 },
  { name: 'Yakima', latitude: 46.6021, longitude: -120.5059 },
  { name: 'Olympia', latitude: 47.0379, longitude: -122.9007 },
  { name: 'Bellingham', latitude: 48.7519, longitude: -122.4787 },
  { name: 'Redmond', latitude: 47.674, longitude: -122.1215 },
  { name: 'Walla Walla', latitude: 46.0646, longitude: -118.343 },
  { name: 'Kennewick', latitude: 46.2112, longitude: -119.1372 },
]

// One degree below the coldest city, so every city shows at the far left
const lowestSliderValue = (rows) =>
  Math.floor(Math.min(...rows.map((row) => row.temperature))) - 1

function App() {
  const [sliderValue, setSliderValue] = useState(0)
  const [minTemp, setMinTemp] = useState(0)
  const [searchInput, setSearchInput] = useState('')
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
        const rows = data.map((result, i) => ({
          city: CITIES[i].name,
          temperature: result.current.temperature_2m,
          chanceOfRain: result.daily.precipitation_probability_max[0],
          hoursOfSun: (result.daily.sunshine_duration[0] / 3600).toFixed(1),
        }))
        setWeather(rows)
        setSliderValue(lowestSliderValue(rows))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  // Wait until the slider stops moving before filtering
  useEffect(() => {
    const timeout = setTimeout(() => setMinTemp(sliderValue), 300)
    return () => clearTimeout(timeout)
  }, [sliderValue])

  const temperatures = weather.map((row) => row.temperature)
  const sliderMin = weather.length ? lowestSliderValue(weather) : 0
  const sliderMax = weather.length ? Math.ceil(Math.max(...temperatures)) : 100

  const filteredWeather = weather.filter(
    (row) =>
      row.city.toLowerCase().includes(searchInput.toLowerCase()) &&
      row.temperature > minTemp
  )

  const average = (key) => {
    if (filteredWeather.length === 0) return null
    const total = filteredWeather.reduce((sum, row) => sum + Number(row[key]), 0)
    return (total / filteredWeather.length).toFixed(1)
  }

  const avgTemperature = average('temperature')
  const avgChanceOfRain = average('chanceOfRain')
  const avgHoursOfSun = average('hoursOfSun')

  return (
    <div className="App">
      <h1>Weather in Washington Right Now</h1>

      <div className="summary-cards">
        <SummaryCard
          emoji="🌡️"
          data={avgTemperature ? `${avgTemperature}°F` : '--'}
          information="Average Temperature"
        />
        <SummaryCard
          emoji="🌧️"
          data={avgChanceOfRain ? `${avgChanceOfRain}%` : '--'}
          information="Average Chance of Rain"
        />
        <SummaryCard
          emoji="☀️"
          data={avgHoursOfSun ? `${avgHoursOfSun} hrs` : '--'}
          information="Average Hours of Sun Today"
        />
      </div>

      <div className="data-container">
        <input
          type="search"
          placeholder="Search for a city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <label>
          Temperature above {sliderValue}°F
          <input
            type="range"
            min={sliderMin}
            max={sliderMax}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
          />
        </label>

        <div className="weather-grid">
          <div className="weather-header">
            <span>City</span>
            <span>Temp</span>
            <span>Rain</span>
            <span>Sun</span>
          </div>

          {loading && <p className="status-message">Loading weather...</p>}

          {error && (
            <p className="status-message">Couldn't load the weather: {error}</p>
          )}

          {!loading && !error && filteredWeather.length === 0 && (
            <p className="status-message">No cities match your filters</p>
          )}

          {filteredWeather.map((row) => (
            <WeatherRow
              key={row.city}
              city={row.city}
              temperature={row.temperature}
              chanceOfRain={row.chanceOfRain}
              hoursOfSun={row.hoursOfSun}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
