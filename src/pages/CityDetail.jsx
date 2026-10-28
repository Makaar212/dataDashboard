import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard'
import CITIES from '../data/cities'

// "2026-10-27T07:46" -> "7:46 AM"
const formatTime = (isoString) =>
  new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

function CityDetail() {
  const { slug } = useParams()
  const city = CITIES.find((c) => c.slug === slug)

  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!city) return

    // Ignore a response that arrives after we've already moved to another city
    let ignore = false

    const fetchDetails = async () => {
      setLoading(true)
      setError(null)

      const url =
        'https://api.open-meteo.com/v1/forecast' +
        `?latitude=${city.latitude}&longitude=${city.longitude}` +
        '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m' +
        '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,' +
        'sunshine_duration,uv_index_max,sunrise,sunset' +
        '&temperature_unit=fahrenheit&wind_speed_unit=mph' +
        '&timezone=America%2FLos_Angeles&forecast_days=1'

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        if (ignore) return

        setDetails({
          temperature: data.current.temperature_2m,
          feelsLike: data.current.apparent_temperature,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          high: data.daily.temperature_2m_max[0],
          low: data.daily.temperature_2m_min[0],
          chanceOfRain: data.daily.precipitation_probability_max[0],
          hoursOfSun: (data.daily.sunshine_duration[0] / 3600).toFixed(1),
          uvIndex: data.daily.uv_index_max[0],
          sunrise: formatTime(data.daily.sunrise[0]),
          sunset: formatTime(data.daily.sunset[0]),
        })
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchDetails()
    return () => {
      ignore = true
    }
  }, [city])

  if (!city) {
    return (
      <div className="page">
        <h1>City not found</h1>
        <p className="status-message">
          We don't have weather for "{slug}". <Link to="/">Back to the dashboard</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to dashboard
      </Link>
      <h1>{city.name}</h1>
      <p className="city-region">{city.region} of the Cascades</p>

      {loading && <p className="status-message">Loading weather...</p>}

      {error && (
        <p className="status-message">Couldn't load the weather: {error}</p>
      )}

      {!loading && !error && details && (
        <>
          <h2 className="section-title">Right Now</h2>
          <div className="summary-cards">
            <SummaryCard emoji="🌡️" data={`${details.temperature}°F`} information="Temperature" />
            <SummaryCard emoji="🧥" data={`${details.feelsLike}°F`} information="Feels Like" />
            <SummaryCard emoji="💧" data={`${details.humidity}%`} information="Humidity" />
            <SummaryCard emoji="🌬️" data={`${details.windSpeed} mph`} information="Wind Speed" />
          </div>

          <h2 className="section-title">Today</h2>
          <div className="summary-cards">
            <SummaryCard emoji="🔺" data={`${details.high}°F`} information="High" />
            <SummaryCard emoji="🔻" data={`${details.low}°F`} information="Low" />
            <SummaryCard emoji="🌧️" data={`${details.chanceOfRain}%`} information="Chance of Rain" />
            <SummaryCard emoji="☀️" data={`${details.hoursOfSun} hrs`} information="Hours of Sun" />
            <SummaryCard emoji="🕶️" data={details.uvIndex} information="UV Index" />
            <SummaryCard emoji="🌅" data={details.sunrise} information="Sunrise" />
            <SummaryCard emoji="🌇" data={details.sunset} information="Sunset" />
          </div>
        </>
      )}
    </div>
  )
}

export default CityDetail
