'use client'

const INDUSTRIES = [
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'technology', label: 'Technology' },
  { value: 'legal', label: 'Legal' },
  { value: 'engineering', label: 'Engineering' },
]

interface Props {
  onStart: (industry: string) => void
  isLoading: boolean
}

export default function IndustrySelector({ onStart, isLoading }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const selected = (form.elements.namedItem('industry') as HTMLSelectElement).value
    if (selected) onStart(selected)
  }

  return (
    <div className="w-full max-w-md text-center space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Expert Screening Bot</h1>
        <p className="text-gray-400 text-sm">
          Select your industry to begin your AI-powered voice screening session.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="industry"
          defaultValue=""
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select your industry</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind.value} value={ind.value}>
              {ind.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Next
        </button>
      </form>
    </div>
  )
}
