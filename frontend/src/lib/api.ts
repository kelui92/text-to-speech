import axios from 'axios'
import type { TranscribeResponse, ChatResponse, IndustriesResponse, Message, SummaryResponse } from './types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
})

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData()
  formData.append('audio', audioBlob, 'audio.webm')
  const { data } = await api.post<TranscribeResponse>('/api/transcribe', formData)
  return data.text
}

export async function getAIResponse(
  industry: string,
  messages: Message[],
  customQuestions: string[] = []
): Promise<string> {
  const { data } = await api.post<ChatResponse>('/api/chat', {
    industry,
    messages,
    custom_questions: customQuestions,
  })
  return data.response
}

export async function getSummary(industry: string, messages: Message[]): Promise<SummaryResponse> {
  const { data } = await api.post<SummaryResponse>('/api/summary', { industry, messages })
  return data
}

export async function textToSpeech(text: string): Promise<ArrayBuffer> {
  const { data } = await api.post<ArrayBuffer>(
    '/api/speak',
    { text, voice: 'alloy' },
    { responseType: 'arraybuffer' }
  )
  return data
}

export async function getIndustries(): Promise<string[]> {
  const { data } = await api.get<IndustriesResponse>('/api/industries')
  return data.industries
}
