'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Brain, Loader2, AlertCircle, TrendingUp, Users, Calendar, MessageSquare } from 'lucide-react';

const RedditAnalyzer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError('Please enter a Reddit username.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/analyze?username=${encodeURIComponent(username)}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Unknown error');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleAnalyze();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-white/20">
              <Brain className="w-8 h-8 text-purple-300" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Reddit Vibe Analyzer
            </h1>
            <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/20">
              <Sparkles className="w-8 h-8 text-pink-300" />
            </div>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Dive deep into the digital psyche and uncover the hidden patterns in Reddit behavior. 
            <span className="text-purple-300 font-semibold"> Let's analyze some vibes ✨</span>
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-lg font-medium">u/</span>
                </div>
                <input
                  type="text"
                  placeholder="enter reddit username"
                  suppressHydrationWarning={true}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  disabled={loading}
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !username.trim()}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center gap-3 min-w-fit"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Analyzing...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Analyze Vibes</span>
                    <span className="sm:hidden">Analyze</span>
                  </>
                )}
              </button>
            </div>
            
            {loading && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-200"></div>
                  <span className="ml-2">Diving into the digital psyche...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-6 flex items-center gap-4">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Analysis Complete for <span className="text-purple-300">u/{result.username}</span>
              </h2>
              <p className="text-slate-300">Here's what we discovered about their digital soul ✨</p>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-purple-300" />
                </div>
                <div className="text-3xl font-bold text-purple-300 mb-1">{result.vibeScore}/10</div>
                <div className="text-slate-300 font-medium">Vibe Score</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-cyan-300" />
                </div>
                <div className="text-3xl font-bold text-cyan-300 mb-1">
                  {result.redditStats?.topSubreddits?.length || 0}
                </div>
                <div className="text-slate-300 font-medium">Top Subs</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-green-300" />
                </div>
                <div className="text-3xl font-bold text-green-300 mb-1">
                  {result.redditStats?.accountAge || 'N/A'}
                </div>
                <div className="text-slate-300 font-medium">Account Age</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-orange-300" />
                </div>
                <div className="text-3xl font-bold text-orange-300 mb-1">
                  {result.therapyMemes?.length || 0}
                </div>
                <div className="text-slate-300 font-medium">Therapy Needs</div>
              </div>
            </div>

            {/* Vibe Description */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-purple-300" />
                Vibe Analysis
              </h3>
              <p className="text-xl text-slate-300 leading-relaxed">{result.vibeDescription}</p>
            </div>

            {/* Detailed Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Playlist */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-green-300" />
                  Spotify Playlist
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-500/10 rounded-xl p-4">
                    <p className="text-green-300 font-semibold text-lg">{result.playlistTitle}</p>
                  </div>
                  <p className="text-slate-300">{result.playlistTheme}</p>
                </div>
              </div>

              {/* Top Subreddits */}
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/10 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-300" />
                  Top Subreddits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.redditStats?.topSubreddits?.map((sub: string, idx: number) => (
                    <span 
                      key={idx}
                      className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      r/{sub}
                    </span>
                  )) || <span className="text-slate-400">No subreddits found</span>}
                </div>
              </div>
            </div>

            {/* Therapy Memes */}
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/10 backdrop-blur-xl border border-red-400/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-300" />
                Therapy Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.therapyMemes?.map((meme: string, idx: number) => (
                  <div key={idx} className="bg-red-500/10 rounded-xl p-4 border border-red-400/20">
                    <p className="text-slate-300">{meme}</p>
                  </div>
                )) || <p className="text-slate-400">No therapy recommendations available</p>}
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Books */}
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📚 Books</h3>
                <ul className="space-y-2">
                  {result.recommendations?.books?.map((book: string, idx: number) => (
                    <li key={idx} className="text-slate-300 text-sm">{book}</li>
                  )) || <li className="text-slate-400">No books found</li>}
                </ul>
              </div>

              {/* Movies */}
              <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/10 backdrop-blur-xl border border-pink-400/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎬 Movies</h3>
                <ul className="space-y-2">
                  {result.recommendations?.movies?.map((movie: string, idx: number) => (
                    <li key={idx} className="text-slate-300 text-sm">{movie}</li>
                  )) || <li className="text-slate-400">No movies found</li>}
                </ul>
              </div>

              {/* Shows */}
              <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📺 Shows</h3>
                <ul className="space-y-2">
                  {result.recommendations?.shows?.map((show: string, idx: number) => (
                    <li key={idx} className="text-slate-300 text-sm">{show}</li>
                  )) || <li className="text-slate-400">No shows found</li>}
                </ul>
              </div>
            </div>

            {/* Psychological Summary */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Brain className="w-7 h-7 text-purple-300" />
                Psychological Summary
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">{result.psychologicalSummary}</p>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {!result && !loading && (
          <div className="text-center mt-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="text-6xl mb-4">🔮</div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to dive deep?</h3>
                <p className="text-slate-400">Enter a Reddit username above to begin the psychological journey</p>
              </div>
            </div>
          </div>
        )}
      </div>

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
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes slide-in-from-bottom-8 {
          from {
            transform: translateY(2rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .slide-in-from-bottom-8 {
          animation-name: slide-in-from-bottom-8;
        }
        .duration-700 {
          animation-duration: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default RedditAnalyzer;