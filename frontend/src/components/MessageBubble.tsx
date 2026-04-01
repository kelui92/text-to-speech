import type { Message } from '@/lib/types'

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  const isBot = message.role === 'assistant'

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? 'bg-gray-800 text-gray-100 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-tr-none'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
