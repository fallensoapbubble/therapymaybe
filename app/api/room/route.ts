import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest) {
  try {

    
    const options = {
    method: "POST",
    headers: {
      "x-api-key": process.env.TAVUS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replica_id: "rb17cf590e15",
      persona_id: "pb67e70fd25c",
      callback_url: "https://google.in",
      conversation_name: Math.random().toString(36).substring(2, 15),
      conversational_context: "You are a compassionate and understanding therapist, dedicated to creating a safe and welcoming space where users feel heard and valued. Your responses should be empathetic, insightful, and encouraging, fostering meaningful conversations that promote personal growth and emotional well-being. You listen attentively, validate feelings, and gently guide users toward self-reflection and empowerment. Maintain a calm and reassuring presence, offering thoughtful advice with a touch of kindness and wisdom.",
      custom_greeting: "Hey there! How are you feeling today?",
      properties: {
        max_call_duration: 3600,
        participant_left_timeout: 60,
        participant_absent_timeout: 300,
        enable_recording: true,
        enable_closed_captions: true,
        apply_greenscreen: true,
        language: "english",
        recording_s3_bucket_name: "conversation-recordings",
        recording_s3_bucket_region: "us-east-1",
        aws_assume_role_arn: "",
      },
    }),
  };

  const response = await fetch("https://tavusapi.com/v2/conversations", options);
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.conversation_url || !data.conversation_id) {
    throw new Error('Invalid response from Tavus API');
  }

  let conversationData: { meetingUrl: string; conversationId: string } = {
    meetingUrl: data.conversation_url,
    conversationId: data.conversation_id
  };

    
    // Return HTML page with video call
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Therapy Session</title>
    <script src="https://unpkg.com/@daily-co/daily-js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
    </style>
  </head>
  <body class="bg-gray-900 text-white min-h-screen">
    <div class="container mx-auto px-4 py-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <svg class="h-8 w-8 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <div>
            <h1 class="text-2xl font-bold">AI Therapy Session</h1>
            <p class="text-gray-400">Connected and ready</p>
          </div>
        </div>
        <a href="/api/room/delete?conid=${conversationData.conversationId}" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center">
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l1.5 1.5M5 5v6a1 1 0 001.707.707L10 8.414"></path>
          </svg>
          End Call
        </a>
      </div>

      <!-- Video Call Container -->
      <div class="w-full max-w-6xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
        <div id="video-call-container" class="w-full h-[600px] bg-black relative">
          <div id="loading-overlay" class="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p class="text-lg font-semibold">Connecting to your therapist...</p>
              <p class="text-gray-400 text-sm mt-2">This may take a few seconds</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="mt-6 bg-gray-800/50 rounded-lg p-6">
        <div class="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div class="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h4 class="font-semibold mb-2">Camera & Mic</h4>
            <p class="text-sm text-gray-400">Allow access when prompted for the best experience</p>
          </div>
          <div>
            <div class="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h4 class="font-semibold mb-2">Speak Freely</h4>
            <p class="text-sm text-gray-400">Share what's on your mind in this safe space</p>
          </div>
          <div>
            <div class="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l1.5 1.5M5 5v6a1 1 0 001.707.707L10 8.414"></path>
              </svg>
            </div>
            <h4 class="font-semibold mb-2">End Anytime</h4>
            <p class="text-sm text-gray-400">You can leave the session whenever you're ready</p>
          </div>
        </div>
      </div>
    </div>

    <script>
      try {
        // Create the Daily iframe for the Tavus conversation
        const callFrame = window.Daily.createFrame({
          iframeStyle: {
            width: '100%',
            height: '600px',
            border: 'none',
          },
        });

        // Join the room
        callFrame.join({ url: '${conversationData.meetingUrl}' });

        // Append iframe to the container
        const container = document.getElementById('video-call-container');
        container.appendChild(callFrame.iframe());

        // Hide loading overlay after a delay
        setTimeout(() => {
          const overlay = document.getElementById('loading-overlay');
          if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s';
            setTimeout(() => overlay.remove(), 500);
          }
        }, 3000);

      } catch (error) {
        console.error('Error initializing video call:', error);
        document.getElementById('loading-overlay').innerHTML = 
          '<div class="text-center"><p class="text-red-400 text-lg">Error connecting to session</p><p class="text-gray-400 text-sm mt-2">Please try refreshing the page</p></div>';
      }
    </script>
  </body>
</html>
    `;
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    
  } catch (error: any) {
    console.error('Room creation error:', error);
    return NextResponse.redirect(`${request.nextUrl.origin}/api/room/?error=${encodeURIComponent('Failed to create session')}`);
  }
}