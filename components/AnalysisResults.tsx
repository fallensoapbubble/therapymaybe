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
    if (score >= 8) return 'text-emerald-400'
    if (score >= 6) return 'text-amber-400'
    if (score >= 4) return 'text-orange-400'
    return 'text-rose-400'
  }

  const getVibeEmoji = (score: number) => {
    if (score >= 8) return '✨'
    if (score >= 6) return '😌'
    if (score >= 4) return '😅'
    return '💀'
  }

  const getVibeGradient = (score: number) => {
    if (score >= 8) return 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20'
    if (score >= 6) return 'from-amber-500/20 via-yellow-500/10 to-orange-500/20'
    if (score >= 4) return 'from-orange-500/20 via-red-500/10 to-pink-500/20'
    return 'from-rose-500/20 via-purple-500/10 to-indigo-500/20'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.button
            onClick={onReset}
            className="group bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl flex items-center gap-3 font-medium text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="hidden sm:inline">analyze another soul</span>
            <span className="sm:hidden">back</span>
          </motion.button>
          
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              u/{username}'s psyche
            </motion.h1>
            <motion.p 
              className="text-slate-300 mt-2 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              prepare to be perceived bestie ✨
            </motion.p>
          </div>
          
          <div className="w-32" />
        </div>

        {/* Vibe Score - Hero Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`relative bg-gradient-to-br ${getVibeGradient(data.vibeScore)} backdrop-blur-xl border border-white/30 rounded-3xl p-8 text-center shadow-2xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-10 h-10 text-purple-300" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white">Vibe Check Results</h2>
              <motion.span 
                className="text-4xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getVibeEmoji(data.vibeScore)}
              </motion.span>
            </div>
            
            <motion.div 
              className="flex items-center justify-center gap-6 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            >
              <div className="text-7xl md:text-8xl font-black">
                <span className={`${getVibeColor(data.vibeScore)} drop-shadow-lg`}>{data.vibeScore}</span>
                <span className="text-slate-400">/10</span>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {data.vibeDescription}
            </motion.p>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Archetype & Peak Hour */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-7 h-7 text-pink-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Reddit Persona Archetype</h3>
              </div>
              <p className="text-lg font-semibold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors">
                {data.archetype}
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-7 h-7 text-cyan-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Peak Spiral Hour</h3>
              </div>
              <p className="text-slate-300 group-hover:text-slate-200 transition-colors text-lg">
                {data.peakSpiralHour}
              </p>
            </div>
          </motion.div>

          {/* Aesthetic Diagnosis */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <Palette className="w-7 h-7 text-purple-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white">Aesthetic Diagnosis</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg group-hover:text-slate-200 transition-colors">
              {data.aestheticDiagnosis}
            </p>
          </motion.div>
        </div>

        {/* Spotify Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Music className="w-7 h-7 text-green-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Your Spotify Playlist</h3>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl p-4 border border-green-400/20">
            <h4 className="text-xl font-semibold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
              {data.playlistTitle}
            </h4>
            <p className="text-slate-300 text-lg group-hover:text-slate-200 transition-colors">
              {data.playlistTheme}
            </p>
          </div>
        </motion.div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Books', items: data.recommendations.books, icon: BookOpen, color: 'text-blue-400', gradient: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-400/30' },
            { title: 'Movies', items: data.recommendations.movies, icon: Sparkles, color: 'text-purple-400', gradient: 'from-purple-500/20 to-pink-500/10', border: 'border-purple-400/30' },
            { title: 'Shows', items: data.recommendations.shows, icon: TrendingUp, color: 'text-pink-400', gradient: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-400/30' }
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`bg-gradient-to-br ${category.gradient} backdrop-blur-xl border ${category.border} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group`}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <category.icon className={`w-7 h-7 ${category.color}`} />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.items.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    className="text-slate-300 flex items-start gap-3 group-hover:text-slate-200 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 + idx * 0.05 }}
                  >
                    <span className="text-pink-400 mt-1 text-lg">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Therapy Reasons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-br from-red-500/20 to-pink-500/10 backdrop-blur-xl border border-red-400/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-7 h-7 text-red-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Meme-Style Therapy Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.therapyReasons.map((reason, index) => (
              <motion.div 
                key={index} 
                className="bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-red-400/20 hover:border-red-400/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-slate-300 font-medium">{reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coping Mechanisms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Coffee className="w-7 h-7 text-amber-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Coping Mechanism Starter Pack</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.copingMechanisms.map((mechanism, index) => (
              <motion.span 
                key={index}
                className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-slate-300 font-medium border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {mechanism}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Psychological Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-br from-purple-500/20 to-indigo-500/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-7 h-7 text-purple-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Psychological Summary</h3>
          </div>
          <p className="text-slate-300 leading-relaxed text-lg group-hover:text-slate-200 transition-colors">
            {data.psychologicalSummary}
          </p>
        </motion.div>

        {/* Most Unhinged Comment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-gradient-to-br from-red-500/20 to-orange-500/10 backdrop-blur-xl border border-red-400/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <MessageCircle className="w-7 h-7 text-red-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Most Unhinged Comment Award 🏆</h3>
          </div>
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-4 border-l-4 border-red-400">
            <p className="text-slate-300 italic text-lg">"{data.unhingedComment}"</p>
          </div>
        </motion.div>

        {/* Mood Trend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-7 h-7 text-cyan-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Mood Trend Analysis</h3>
          </div>
          <p className="text-slate-300 text-lg group-hover:text-slate-200 transition-colors">
            {data.moodTrend}
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center py-8"
        >
          <p className="text-slate-400 mb-6 text-lg">
            remember bestie, this is all in good fun ✨ your digital footprint doesn't define your worth
          </p>
          <motion.button
            onClick={onReset}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            analyze another soul
          </motion.button>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}