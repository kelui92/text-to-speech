export type Industry = 'finance' | 'healthcare' | 'technology' | 'legal' | 'engineering'

export interface Message {
  role: 'assistant' | 'user'
  content: string
}

export interface TranscribeResponse {
  text: string
}

export interface ChatResponse {
  response: string
}

export interface IndustriesResponse {
  industries: string[]
}

export type SessionPhase = 'select' | 'questions' | 'conversation' | 'summary'

export interface SummaryResponse {
  overall: string
  strengths: string[]
  gaps: string[]
  score: 'Strong' | 'Good' | 'Fair' | 'Weak'
}
