import { Link } from 'react-router-dom'

function WeatherRow({ slug, city, temperature, chanceOfRain, hoursOfSun }) {
  return (
    <Link to={`/city/${slug}`} className="weather-row">
      <span>{city}</span>
      <span>{temperature}°F</span>
      <span>{chanceOfRain}%</span>
      <span>{hoursOfSun} hrs</span>
    </Link>
  )
}

export default WeatherRow
