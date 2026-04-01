import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Expert Screening Bot',
  description: 'AI-powered voice screening for industry experts',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  )
}
