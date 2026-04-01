'use client'

import { useState, useRef, useCallback } from 'react'
import { transcribeAudio } from '@/lib/api'

interface Props {
  onTranscript: (text: string) => void
  disabled: boolean
}

export default function VoiceRecorder({ onTranscript, disabled }: Props) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    if (disabled || isRecording) return

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }

    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop())
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      setIsProcessing(true)
      try {
        const text = await transcribeAudio(blob)
        if (text.trim()) onTranscript(text)
      } catch {
        alert('Could not transcribe audio. Please try again.')
      } finally {
        setIsProcessing(false)
      }
    }

    mediaRecorder.start()
    setIsRecording(true)
  }, [disabled, isRecording, onTranscript])

  const stopRecording = useCallback(() => {
    if (!isRecording || !mediaRecorderRef.current) return
    mediaRecorderRef.current.stop()
    setIsRecording(false)
  }, [isRecording])

  const isDisabled = disabled || isProcessing

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        disabled={isDisabled}
        aria-label={isRecording ? 'Recording — release to send' : 'Hold to speak'}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all select-none ${
          isRecording
            ? 'bg-red-500 scale-110 ring-4 ring-red-400 ring-opacity-50'
            : isDisabled
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
        }`}
      >
        <MicIcon />
      </button>
      <span className="text-xs text-gray-500">
        {isProcessing
          ? 'Transcribing...'
          : isRecording
          ? 'Release to send'
          : 'Hold to speak'}
      </span>
    </div>
  )
}

function MicIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" />
      <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.08A7 7 0 0 0 19 11z" />
    </svg>
  )
}
