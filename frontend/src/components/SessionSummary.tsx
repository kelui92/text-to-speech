'use client'

import type { SummaryResponse, Message } from '@/lib/types'

interface Props {
  summary: SummaryResponse
  messages: Message[]
  industry: string
  onRestart: () => void
}

const SCORE_STYLES: Record<string, string> = {
  Strong: 'bg-green-900 text-green-300 border-green-700',
  Good: 'bg-blue-900 text-blue-300 border-blue-700',
  Fair: 'bg-yellow-900 text-yellow-300 border-yellow-700',
  Weak: 'bg-red-900 text-red-300 border-red-700',
}

export default function SessionSummary({ summary, messages, industry, onRestart }: Props) {
  return (
    <div className="w-full max-w-xl space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Session Summary</h2>
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full border ${SCORE_STYLES[summary.score] ?? ''}`}
        >
          {summary.score}
        </span>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed">{summary.overall}</p>

      {summary.strengths.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wide">Strengths</h3>
          <ul className="space-y-1">
            {summary.strengths.map((s, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.gaps.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">Areas to Probe</h3>
          <ul className="space-y-1">
            {summary.gaps.map((g, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="text-yellow-500 mt-0.5">△</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      <details className="group">
        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300 transition-colors select-none">
          View full transcript
        </summary>
        <div className="mt-3 space-y-3 border-t border-gray-800 pt-3">
          {messages.map((msg, i) => (
            <div key={i} className={`text-xs ${msg.role === 'assistant' ? 'text-blue-300' : 'text-gray-300'}`}>
              <span className="font-semibold uppercase text-gray-500 mr-2">
                {msg.role === 'assistant' ? 'Bot' : 'You'}
              </span>
              {msg.content}
            </div>
          ))}
        </div>
      </details>

      <button
        onClick={onRestart}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Start New Session
      </button>
    </div>
  )
}
