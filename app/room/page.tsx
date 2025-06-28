'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Video, Loader2 } from 'lucide-react';


/* ---------------------------------------
   COMPONENT: Button (styled only)
---------------------------------------- */
function Button({
  children,
  onClick,
  className = '',
  variant = 'default',
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'destructive';
}) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
    destructive: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------
   COMPONENT: Card (styled only)
---------------------------------------- */




export default function page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meetingUrl, setMeetingUrl] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('url');

    if (url) {
      setMeetingUrl(url);
      setLoading(false);
    } else {
      window.location.href = 'api/room';
    }
  }, []);

  const endCall = async () => {
    try {
      window.location.href = '/api/room/delete';
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  // Theme wrapper
  const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (loading) {
    return (
      <ThemeWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-emerald-400" />
            <h2 className="text-2xl font-semibold mb-2">Setting up your session...</h2>
            <p className="text-gray-400">This may take a moment</p>
          </motion.div>
        </div>
      </ThemeWrapper>
    );
  }

  if (error) {
    return (
      <ThemeWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center text-red-400 mb-4">
              <PhoneOff className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Connection Error</h2>
            </div>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => (window.location.href = 'api/room')}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </ThemeWrapper>
    );
  }

  return (
    <ThemeWrapper>
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-emerald-400 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">AI Therapy Session</h1>
                <p className="text-gray-400 text-sm">Connected and ready</p>
              </div>
            </div>
            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center font-medium transition"
            >
              <PhoneOff className="h-4 w-4 mr-2" />
              End Call
            </button>
          </div>

          {/* Video Container */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg">
            <div className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden">
              {meetingUrl && (
                <iframe
                  src={meetingUrl}
                  className="w-full h-full border-0"
                  allow="camera; microphone; display-capture"
                />
              )}

              {/* Loading overlay while iframe loads */}
              <div
                className="absolute inset-0 bg-gray-900/90 flex items-center justify-center transition-opacity duration-500"
                id="loading-overlay"
              >
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-emerald-400" />
                  <p className="text-lg">Connecting to your therapist...</p>
                  <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-gray-800/70 border border-gray-700 rounded-xl shadow-md p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: <Video className="h-6 w-6 text-blue-400" />,
                  title: 'Camera & Mic',
                  desc: 'Allow access when prompted for the best experience',
                  bg: 'bg-blue-600/20',
                },
                {
                  icon: <Phone className="h-6 w-6 text-green-400" />,
                  title: 'Speak Freely',
                  desc: 'Share what’s on your mind in this safe space',
                  bg: 'bg-green-600/20',
                },
                {
                  icon: <PhoneOff className="h-6 w-6 text-purple-400" />,
                  title: 'End Anytime',
                  desc: 'You can leave the session whenever you’re ready',
                  bg: 'bg-purple-600/20',
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    {item.icon}
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              setTimeout(function() {
                const overlay = document.getElementById('loading-overlay');
                if (overlay) {
                  overlay.style.opacity = '0';
                  setTimeout(() => overlay.remove(), 500);
                }
              }, 2000);
            });
          `,
        }}
      />
    </ThemeWrapper>
  );
}
