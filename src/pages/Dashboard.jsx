import { useEffect, useState } from 'react'
import CityBarChart from '../components/CityBarChart'
import SummaryCard from '../components/SummaryCard'
import WeatherRow from '../components/WeatherRow'

// One degree below the coldest city, so every city shows at the far left
const lowestSliderValue = (rows) =>
  Math.floor(Math.min(...rows.map((row) => row.temperature))) - 1

function Dashboard({ weather, loading, error }) {
  // null means the slider hasn't been touched yet, so nothing is filtered out
  const [sliderValue, setSliderValue] = useState(null)
  const [minTemp, setMinTemp] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  // Wait until the slider stops moving before filtering
  useEffect(() => {
    const timeout = setTimeout(() => setMinTemp(sliderValue), 300)
    return () => clearTimeout(timeout)
  }, [sliderValue])

  const temperatures = weather.map((row) => row.temperature)
  const sliderMin = weather.length ? lowestSliderValue(weather) : 0
  const sliderMax = weather.length ? Math.ceil(Math.max(...temperatures)) : 100
  const displayedSliderValue = sliderValue ?? sliderMin

  const filteredWeather = weather.filter(
    (row) =>
      row.city.toLowerCase().includes(searchInput.toLowerCase()) &&
      (minTemp === null || row.temperature > minTemp)
  )

  const average = (key) => {
    if (filteredWeather.length === 0) return null
    const total = filteredWeather.reduce((sum, row) => sum + Number(row[key]), 0)
    return (total / filteredWeather.length).toFixed(1)
  }

  const avgTemperature = average('temperature')
  const avgChanceOfRain = average('chanceOfRain')
  const avgHoursOfSun = average('hoursOfSun')

  // Temperature has no natural zero, so zoom the axis in around the actual values
  const filteredTemps = filteredWeather.map((row) => row.temperature)
  const tempDomain = [
    Math.floor(Math.min(...filteredTemps)) - 2,
    Math.ceil(Math.max(...filteredTemps)) + 1,
  ]

  return (
    <div className="page">
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

      {filteredWeather.length > 0 && (
        <div className="charts">
          <CityBarChart
            title="Temperature by City"
            valueName="Temperature"
            data={filteredWeather}
            dataKey="temperature"
            unit="°F"
            domain={tempDomain}
          />
          <CityBarChart
            title="Chance of Rain by City"
            valueName="Chance of Rain"
            data={filteredWeather}
            dataKey="chanceOfRain"
            unit="%"
            domain={[0, 100]}
          />
        </div>
      )}

      <div className="data-container">
        <input
          type="search"
          placeholder="Search for a city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <label>
          Temperature above {displayedSliderValue}°F
          <input
            type="range"
            min={sliderMin}
            max={sliderMax}
            value={displayedSliderValue}
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
              key={row.slug}
              slug={row.slug}
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

export default Dashboard
