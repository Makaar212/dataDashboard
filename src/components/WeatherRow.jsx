function WeatherRow({ city, temperature, chanceOfRain, hoursOfSun }) {
  return (
    <div className="weather-row">
      <span>{city}</span>
      <span>{temperature}°F</span>
      <span>{chanceOfRain}%</span>
      <span>{hoursOfSun} hrs</span>
    </div>
  )
}

export default WeatherRow
