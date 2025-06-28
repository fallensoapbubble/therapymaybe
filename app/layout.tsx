import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reddit Vibe Check | Personality Analyzer',
  description: 'Get roasted by AI based on your Reddit activity. It\'s giving therapy but make it memes.',
  keywords: 'reddit, personality, analyzer, AI, memes, therapy, gen-z',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}