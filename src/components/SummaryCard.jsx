function SummaryCard({ emoji, data, information }) {
  return (
    <div className="summary-card">
      <span>{emoji}</span>
      <h2>{data}</h2>
      <p>{information}</p>
    </div>
  )
}

export default SummaryCard
