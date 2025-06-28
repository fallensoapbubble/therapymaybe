'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Brain, 
  Music, 
  BookOpen, 
  Coffee, 
  Sparkles, 
  TrendingUp,
  MessageCircle,
  Clock,
  Palette,
  Heart,
  Zap
} from 'lucide-react'

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

interface Props {
  data: AnalysisData
  username: string
  onReset: () => void
}

export default function AnalysisResults({ data, username, onReset }: Props) {
  const getVibeColor = (score: number) => {
    if (score >= 8) return 'text-green-500'
    if (score >= 6) return 'text-yellow-500'
    if (score >= 4) return 'text-orange-500'
    return 'text-red-500'
  }

  const getVibeEmoji = (score: number) => {
    if (score >= 8) return '✨'
    if (score >= 6) return '😌'
    if (score >= 4) return '😅'
    return '💀'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.button
          onClick={onReset}
          className="apple-button px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          analyze another soul
        </motion.button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text">
            u/{username}'s digital psyche
          </h1>
          <p className="text-apple-gray-600 mt-1">prepare to be perceived bestie</p>
        </div>
        
        <div className="w-32" /> {/* Spacer for centering */}
      </div>

      {/* Vibe Score - Hero Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-3xl p-8 text-center neon-glow"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Brain className="w-8 h-8 text-gen-z-purple" />
          <h2 className="text-2xl font-bold text-apple-gray-800">Vibe Check Results</h2>
          <span className="text-3xl">{getVibeEmoji(data.vibeScore)}</span>
        </div>
        
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="text-6xl font-bold">
            <span className={getVibeColor(data.vibeScore)}>{data.vibeScore}</span>
            <span className="text-apple-gray-400">/10</span>
          </div>
        </div>
        
        <p className="text-xl text-apple-gray-700 font-medium max-w-2xl mx-auto">
          {data.vibeDescription}
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Archetype & Peak Hour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-gen-z-pink" />
              <h3 className="text-xl font-bold text-apple-gray-800">Reddit Persona Archetype</h3>
            </div>
            <p className="text-lg font-semibold text-gen-z-purple mb-2">{data.archetype}</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-gen-z-blue" />
              <h3 className="text-xl font-bold text-apple-gray-800">Peak Spiral Hour</h3>
            </div>
            <p className="text-apple-gray-700">{data.peakSpiralHour}</p>
          </div>
        </motion.div>

        {/* Aesthetic Diagnosis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-gen-z-purple" />
            <h3 className="text-xl font-bold text-apple-gray-800">Aesthetic Diagnosis</h3>
          </div>
          <p className="text-apple-gray-700 leading-relaxed">{data.aestheticDiagnosis}</p>
        </motion.div>
      </div>

      {/* Spotify Playlist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Music className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-bold text-apple-gray-800">Your Spotify Playlist</h3>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl p-4">
          <h4 className="text-lg font-semibold text-green-700 mb-2">{data.playlistTitle}</h4>
          <p className="text-apple-gray-700">{data.playlistTheme}</p>
        </div>
      </motion.div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Books', items: data.recommendations.books, icon: BookOpen, color: 'text-blue-500' },
          { title: 'Movies', items: data.recommendations.movies, icon: Sparkles, color: 'text-purple-500' },
          { title: 'Shows', items: data.recommendations.shows, icon: TrendingUp, color: 'text-pink-500' }
        ].map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <category.icon className={`w-6 h-6 ${category.color}`} />
              <h3 className="text-xl font-bold text-apple-gray-800">{category.title}</h3>
            </div>
            <ul className="space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx} className="text-apple-gray-700 flex items-start gap-2">
                  <span className="text-gen-z-pink mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Therapy Reasons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-bold text-apple-gray-800">Meme-Style Therapy Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.therapyReasons.map((reason, index) => (
            <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
              <p className="text-apple-gray-700 font-medium">{reason}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Coping Mechanisms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Coffee className="w-6 h-6 text-gen-z-yellow" />
          <h3 className="text-xl font-bold text-apple-gray-800">Coping Mechanism Starter Pack</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {data.copingMechanisms.map((mechanism, index) => (
            <span 
              key={index}
              className="bg-gradient-to-r from-gen-z-yellow/20 to-gen-z-orange/20 px-4 py-2 rounded-full text-apple-gray-700 font-medium"
            >
              {mechanism}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Psychological Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-gen-z-purple" />
          <h3 className="text-xl font-bold text-apple-gray-800">Psychological Summary</h3>
        </div>
        <p className="text-apple-gray-700 leading-relaxed text-lg">{data.psychologicalSummary}</p>
      </motion.div>

      {/* Most Unhinged Comment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-bold text-apple-gray-800">Most Unhinged Comment Award 🏆</h3>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border-l-4 border-red-400">
          <p className="text-apple-gray-700 italic">"{data.unhingedComment}"</p>
        </div>
      </motion.div>

      {/* Mood Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-gen-z-blue" />
          <h3 className="text-xl font-bold text-apple-gray-800">Mood Trend Analysis</h3>
        </div>
        <p className="text-apple-gray-700">{data.moodTrend}</p>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-center py-8"
      >
        <p className="text-apple-gray-500 mb-4">
          remember bestie, this is all in good fun ✨ your digital footprint doesn't define your worth
        </p>
        <motion.button
          onClick={onReset}
          className="gen-z-button px-8 py-3 rounded-xl font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-4 h-4 inline mr-2" />
          analyze another soul
        </motion.button>
      </motion.div>
    </motion.div>
  )
}