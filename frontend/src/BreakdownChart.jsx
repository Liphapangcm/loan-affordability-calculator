import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const { name, value } = payload[0].payload
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 px-4 py-2">
      <p className="text-xs text-gray-500">{name}</p>
      <p className="text-sm font-semibold text-gray-900 tabular-nums">
        M{value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </p>
    </div>
  )
}

function BreakdownChart({ result }) {
  if (!result) return null

  const data = [
    { name: 'Gross salary', value: result.gross_salary },
    { name: 'Net pay', value: result.net_pay },
    { name: 'Disposable income', value: result.disposable_income },
    { name: 'Discretionary income', value: result.discretionary_income },
    { name: 'Max affordable repayment', value: result.max_affordable_repayment },
  ]

  const colors = ['#111827', '#374151', '#6B7280', '#9CA3AF', '#10B981']

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6">
      <p className="text-sm text-gray-500 mb-1">Where your salary goes</p>
      <p className="text-xs text-gray-400 mb-4">Each step subtracts from the last</p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={{ stroke: '#F0F0F0' }}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BreakdownChart