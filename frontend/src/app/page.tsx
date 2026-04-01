'use client'

import { useState, useCallback } from 'react'
import IndustrySelector from '@/components/IndustrySelector'
import QuestionEditor from '@/components/QuestionEditor'
import ConversationUI from '@/components/ConversationUI'
import SessionSummary from '@/components/SessionSummary'
import type { Message, SessionPhase, SummaryResponse } from '@/lib/types'
import { getAIResponse, getSummary, textToSpeech } from '@/lib/api'

export default function Home() {
  const [phase, setPhase] = useState<SessionPhase>('select')
  const [industry, setIndustry] = useState<string>('')
  const [customQuestions, setCustomQuestions] = useState<string[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [summary, setSummary] = useState<SummaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleIndustrySelected = useCallback((selectedIndustry: string) => {
    setIndustry(selectedIndustry)
    setPhase('questions')
  }, [])

  const handleSessionStart = useCallback(async (questions: string[]) => {
    setCustomQuestions(questions)
    setIsLoading(true)
    try {
      const response = await getAIResponse(industry, [], questions)
      const botMessage: Message = { role: 'assistant', content: response }
      setMessages([botMessage])
      await playAudio(response)
      setPhase('conversation')
    } catch {
      alert('Failed to start session. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }, [industry])

  const handleUserSpeech = useCallback(async (transcript: string) => {
    const userMessage: Message = { role: 'user', content: transcript }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)
    try {
      const response = await getAIResponse(industry, updatedMessages, customQuestions)
      const botMessage: Message = { role: 'assistant', content: response }
      setMessages([...updatedMessages, botMessage])
      await playAudio(response)
    } catch {
      alert('Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [messages, industry, customQuestions])

  const handleEndSession = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getSummary(industry, messages)
      setSummary(result)
      setPhase('summary')
    } catch {
      alert('Failed to generate summary. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [industry, messages])

  const handleRestart = useCallback(() => {
    setPhase('select')
    setIndustry('')
    setCustomQuestions([])
    setMessages([])
    setSummary(null)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {phase === 'select' && (
        <IndustrySelector onStart={handleIndustrySelected} isLoading={isLoading} />
      )}
      {phase === 'questions' && (
        <QuestionEditor
          industry={industry}
          onStart={handleSessionStart}
          onBack={() => setPhase('select')}
        />
      )}
      {phase === 'conversation' && (
        <ConversationUI
          messages={messages}
          isLoading={isLoading}
          onUserSpeech={handleUserSpeech}
          onEndSession={handleEndSession}
        />
      )}
      {phase === 'summary' && summary && (
        <SessionSummary
          summary={summary}
          messages={messages}
          industry={industry}
          onRestart={handleRestart}
        />
      )}
    </main>
  )
}

async function playAudio(text: string): Promise<void> {
  const audioContext = new AudioContext()
  const arrayBuffer = await textToSpeech(text)
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  const source = audioContext.createBufferSource()
  source.buffer = audioBuffer
  source.connect(audioContext.destination)
  return new Promise((resolve) => {
    source.onended = () => resolve()
    source.start()
  })
}
