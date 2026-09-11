import { useState } from 'react'

function Form({ onSubmit }) {
  const [basicPay, setBasicPay] = useState('')
  const [allowances, setAllowances] = useState('')
  const [contributesGpf, setContributesGpf] = useState(false)
  const [medicalAid, setMedicalAid] = useState('')
  const [unionDues, setUnionDues] = useState('')
  const [existingDebt, setExistingDebt] = useState('')
  const [livingExpenses, setLivingExpenses] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      basic_pay: parseFloat(basicPay) || 0,
      allowances: parseFloat(allowances) || 0,
      contributes_gpf: contributesGpf,
      medical_aid: parseFloat(medicalAid) || 0,
      union_dues: parseFloat(unionDues) || 0,
      existing_debt_obligations: parseFloat(existingDebt) || 0,
      living_expenses: parseFloat(livingExpenses) || 0,
    })
  }

  const inputClass =
    "w-full mt-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"

  const labelClass = "block text-sm font-medium text-gray-500"

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 space-y-4">
      <div>
        <label className={labelClass}>Basic pay</label>
        <input type="number" className={inputClass} value={basicPay} onChange={(e) => setBasicPay(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Allowances</label>
        <input type="number" className={inputClass} value={allowances} onChange={(e) => setAllowances(e.target.value)} />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-500 pt-1">
        <input
          type="checkbox"
          checked={contributesGpf}
          onChange={(e) => setContributesGpf(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
        />
        Contributes to GPF
      </label>

      <div>
        <label className={labelClass}>Medical aid</label>
        <input type="number" className={inputClass} value={medicalAid} onChange={(e) => setMedicalAid(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Union dues</label>
        <input type="number" className={inputClass} value={unionDues} onChange={(e) => setUnionDues(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Existing debt obligations</label>
        <input type="number" className={inputClass} value={existingDebt} onChange={(e) => setExistingDebt(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Living expenses</label>
        <input type="number" className={inputClass} value={livingExpenses} onChange={(e) => setLivingExpenses(e.target.value)} />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 text-white rounded-xl py-3 font-medium hover:bg-gray-800 transition"
      >
        Calculate affordability
      </button>
    </form>
  )
}

export default Form