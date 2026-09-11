import { Wallet, TrendingDown, PiggyBank, ShieldCheck } from 'lucide-react'

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Icon size={16} className="text-gray-400" />
        {label}
      </div>
      <span className="font-medium text-gray-900 tabular-nums">
        M{(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </span>
    </div>
  )
}

function Results({ result }) {
  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 text-sm text-gray-500">
        Fill in the form to see your affordability breakdown.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium">
          Assessment complete
        </span>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500">Max affordable repayment</p>
        <p className="text-4xl font-bold text-gray-900 tabular-nums">
          M{(result.max_affordable_repayment ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
      </div>

      <Row icon={Wallet} label="Gross salary" value={result.gross_salary} />
      <Row icon={TrendingDown} label="Net pay" value={result.net_pay} />
      <Row icon={PiggyBank} label="Disposable income" value={result.disposable_income} />
      <Row icon={PiggyBank} label="Discretionary income" value={result.discretionary_income} />
      <Row icon={ShieldCheck} label="Regulatory ceiling" value={result.regulatory_ceiling} />
    </div>
  )
}

export default Results