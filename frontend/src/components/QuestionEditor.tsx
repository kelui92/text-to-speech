'use client'

import { useState } from 'react'

interface Props {
  industry: string
  onStart: (questions: string[]) => void
  onBack: () => void
}

export default function QuestionEditor({ industry, onStart, onBack }: Props) {
  const [questions, setQuestions] = useState<string[]>([''])

  const update = (index: number, value: string) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? value : q)))
  }

  const add = () => setQuestions((prev) => [...prev, ''])

  const remove = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  const handleStart = () => {
    const filled = questions.map((q) => q.trim()).filter(Boolean)
    onStart(filled)
  }

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Custom Screening Questions</h2>
        <p className="text-gray-400 text-sm">
          Add specific questions for the <span className="capitalize text-white">{industry}</span> session.
          Leave blank to use AI-generated questions only.
        </p>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={q}
              onChange={(e) => update(i, e.target.value)}
              placeholder={`Question ${i + 1}`}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {questions.length > 1 && (
              <button
                onClick={() => remove(i)}
                aria-label="Remove question"
                className="text-gray-500 hover:text-red-400 transition-colors px-2"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        + Add another question
      </button>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-300 font-medium py-3 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleStart}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Start Session
        </button>
      </div>
    </div>
  )
}
