import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const AXIS_TEXT = { fill: 'rgba(255, 255, 255, 0.85)', fontSize: 12 }

// One horizontal bar per city, sorted from highest to lowest value
function CityBarChart({ title, valueName, data, dataKey, unit, domain }) {
  const sorted = [...data].sort((a, b) => b[dataKey] - a[dataKey])

  return (
    <div className="chart-card">
      <h2 className="chart-title">{title}</h2>
      <ResponsiveContainer width="100%" height={sorted.length * 28 + 40}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 8, right: 16 }}>
          <CartesianGrid horizontal={false} stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis
            type="number"
            domain={domain}
            unit={unit}
            tick={AXIS_TEXT}
            stroke="rgba(255, 255, 255, 0.3)"
          />
          <YAxis
            type="category"
            dataKey="city"
            width={100}
            tick={AXIS_TEXT}
            stroke="rgba(255, 255, 255, 0.3)"
          />
          <Tooltip
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            formatter={(value) => [`${value}${unit}`, valueName]}
            contentStyle={{
              background: 'rgba(20, 50, 90, 0.9)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
            }}
            labelStyle={{ fontWeight: 600 }}
            itemStyle={{ color: 'white' }}
          />
          <Bar dataKey={dataKey} fill="white" barSize={16} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CityBarChart
