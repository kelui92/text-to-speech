'use client'

import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import VoiceRecorder from './VoiceRecorder'
import type { Message } from '@/lib/types'

interface Props {
  messages: Message[]
  isLoading: boolean
  onUserSpeech: (transcript: string) => void
  onEndSession: () => void
}

export default function ConversationUI({ messages, isLoading, onUserSpeech, onEndSession }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="w-full max-w-xl flex flex-col h-[90vh]">
      <header className="py-3 px-4 flex items-center justify-between border-b border-gray-800">
        <div>
          <h1 className="text-lg font-semibold">Screening Session</h1>
          <p className="text-xs text-gray-500">Speak your answers when prompted</p>
        </div>
        <button
          onClick={onEndSession}
          disabled={isLoading || messages.length < 2}
          className="text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          End Session
        </button>
      </header>

      <div className="flex-1 overflow-y-auto py-4 space-y-3 px-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <footer className="py-4 border-t border-gray-800 flex justify-center">
        <VoiceRecorder onTranscript={onUserSpeech} disabled={isLoading} />
      </footer>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center h-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}
