'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Brain, Sparkles, Coffee, Heart, Zap } from 'lucide-react'
import AnalysisResults from './components/AnalysisResults'

interface AnalysisData {
  vibeScore: number
  vibeDescription: string
  playlistTitle: string
  playlistTheme: string
  recommendations: {
    books: string[]
    movies: string[]
    shows: string[]
  }
  therapyReasons: string[]
  psychologicalSummary: string
  archetype: string
  peakSpiralHour: string
  aestheticDiagnosis: string
  copingMechanisms: string[]
  unhingedComment: string
  moodTrend: string
}

export default function Home() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError('bestie, you need to enter a username 💀')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze user')
      }

      const data = await response.json()
      setAnalysisData(data)
    } catch (err) {
      setError('something went wrong bestie, try again? 🥺')
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gen-z-pink/20 rounded-full blur-xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gen-z-purple/20 rounded-full blur-xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-gen-z-blue/20 rounded-full blur-xl"
          animate={{ 
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!analysisData ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 mb-6"
                >
                  <Brain className="w-8 h-8 text-gen-z-purple animate-pulse" />
                  <h1 className="text-5xl font-bold gradient-text">
                    Reddit Vibe Check
                  </h1>
                  <Sparkles className="w-8 h-8 text-gen-z-pink animate-bounce" />
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-apple-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                  Get absolutely <span className="font-semibold text-gen-z-purple">roasted</span> by AI based on your Reddit activity. 
                  It's giving therapy but make it <span className="font-semibold text-gen-z-pink">memes</span> ✨
                </motion.p>
              </div>

              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-3xl p-8 neon-glow max-w-2xl mx-auto"
              >
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-apple-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="enter your reddit username (no u/ needed bestie)"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl text-lg placeholder-apple-gray-400 focus:outline-none focus:ring-2 focus:ring-gen-z-purple/50 focus:border-transparent transition-all duration-300"
                      disabled={loading}
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-red-500 text-center font-medium"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    onClick={handleAnalyze}
                    disabled={loading || !username.trim()}
                    className="w-full gen-z-button py-4 px-8 rounded-2xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Brain className="w-5 h-5" />
                        </motion.div>
                        analyzing your digital soul...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Zap className="w-5 h-5" />
                        roast my reddit personality
                      </div>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Features Preview */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { icon: Coffee, title: "Peak Spiral Hour", desc: "when you're most unhinged online" },
                  { icon: Heart, title: "Vibe Score", desc: "psychological wellness but make it sarcastic" },
                  { icon: Sparkles, title: "Aesthetic Diagnosis", desc: "your tumblr-core personality type" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="glass-card rounded-2xl p-6 text-center hover:neon-glow transition-all duration-300"
                  >
                    <feature.icon className="w-8 h-8 text-gen-z-purple mx-auto mb-3" />
                    <h3 className="font-semibold text-apple-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-apple-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <AnalysisResults 
              data={analysisData} 
              username={username}
              onReset={() => {
                setAnalysisData(null)
                setUsername('')
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}