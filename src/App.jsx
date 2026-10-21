import './App.css'
import SummaryCard from './components/SummaryCard'

function App() {
  return (
    <div className="App">
      <h1>Weather in Washington</h1>

      <SummaryCard emoji="🌡️" data="--" information="Average Temperature" />
      <SummaryCard emoji="🌧️" data="--" information="Average Chance of Rain" />
      <SummaryCard emoji="☀️" data="--" information="Average Hours of Sun" />
    </div>
  )
}

export default App
