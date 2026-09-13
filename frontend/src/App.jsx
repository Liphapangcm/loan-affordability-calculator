import { useState } from 'react'
import Form from './Form'
import Results from './Results'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL

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
        throw new Error(`Server returned ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Unable to connect to the backend server. Make sure Python/Uvicorn is running on port 8000.')
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