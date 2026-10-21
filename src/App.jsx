import { useState } from 'react'
import './App.css'
import SummaryCard from './components/SummaryCard'

function App() {
  const [minTemp, setMinTemp] = useState(0)

  return (
    <div className="App">
      <h1>Weather in Washington</h1>

      <SummaryCard emoji="🌡️" data="--" information="Average Temperature" />
      <SummaryCard emoji="🌧️" data="--" information="Average Chance of Rain" />
      <SummaryCard emoji="☀️" data="--" information="Average Hours of Sun" />

      <div className="data-container">
        <input type="search" placeholder="Search for a city..." />

        <label>
          Temperature above {minTemp}°F
          <input
            type="range"
            min="0"
            max="100"
            value={minTemp}
            onChange={(e) => setMinTemp(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  )
}

export default App
