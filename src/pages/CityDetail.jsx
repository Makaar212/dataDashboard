import { Link, useParams } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard'
import CITIES from '../data/cities'

function CityDetail({ weather, loading, error }) {
  const { slug } = useParams()
  const city = CITIES.find((c) => c.slug === slug)
  const row = weather.find((r) => r.slug === slug)

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

      {loading && <p className="status-message">Loading weather...</p>}

      {error && (
        <p className="status-message">Couldn't load the weather: {error}</p>
      )}

      {row && (
        <div className="summary-cards">
          <SummaryCard emoji="🌡️" data={`${row.temperature}°F`} information="Temperature" />
          <SummaryCard emoji="🌧️" data={`${row.chanceOfRain}%`} information="Chance of Rain" />
          <SummaryCard emoji="☀️" data={`${row.hoursOfSun} hrs`} information="Hours of Sun Today" />
        </div>
      )}
    </div>
  )
}

export default CityDetail
