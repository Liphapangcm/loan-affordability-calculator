import { useState } from 'react'
import Form from './Form'
import Results from './Results'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const fieldLabels= {
    basic_pay: "Basic pay",
    allowances: "Allowances",
    medical_aid: "Medical aid",
    union_dues: "Union dues",
    existing_debt_obligations: "Existing debt obligations",
    living_expenses: "Living expenses"
  }

  async function handleFormSubmit(formData) {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${apiUrl}/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 422) {
          const firstError = errorData.detail[0]
          const fieldKey = firstError.loc[firstError.loc.length - 1]
          const readableName = fieldLabels[fieldKey] || fieldKey

          if (firstError.type === 'greater_than_equal'){
            throw new Error(`${readableName} can't be negative`)
          }

          if (firstError.type === 'greater_than'){
            throw new Error(`${readableName} must be greater than than zero`)
          }
          throw new Error(`${readableName}: ${firstError.msg}`)
        }
        throw new Error(`Server returned ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Loan Affordability Calculator
        </h1>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          <Form onSubmit={handleFormSubmit} loading={loading} />
          <Results result={result} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default App