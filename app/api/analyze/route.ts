import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

interface RedditPost {
  data: {
    title?: string
    selftext?: string
    body?: string
    score: number
    subreddit: string
    created_utc: number
    permalink: string
  }
}

interface RedditResponse {
  data: {
    children: RedditPost[]
  }
}

async function fetchRedditData(username: string) {
  try {
    const response = await fetch(`https://www.reddit.com/user/${username}.json`, {
      headers: {
        'User-Agent': 'RedditAnalyzer/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`)
    }

    const data: RedditResponse = await response.json()
    return data.data.children
  } catch (error) {
    console.error('Error fetching Reddit data:', error)
    throw new Error('Failed to fetch Reddit data')
  }
}

function analyzeRedditData(posts: RedditPost[]) {
  const comments = posts
    .map(post => post.data.body || post.data.selftext || post.data.title)
    .filter(Boolean)
    .slice(0, 50) // Limit to recent posts

  const subreddits = [...new Set(posts.map(post => post.data.subreddit))]
  
  const timestamps = posts.map(post => new Date(post.data.created_utc * 1000))
  
  const totalScore = posts.reduce((sum, post) => sum + (post.data.score || 0), 0)
  
  return {
    comments,
    subreddits,
    timestamps,
    totalScore,
    postCount: posts.length
  }
}

function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function generateAnalysis(redditData: any) {
  const prompt = `You are a humorous mental wellness AI. Analyze the following Reddit user data and return a JSON response with these exact fields:

{
  "vibeScore": (number 0-10),
  "vibeDescription": "one-line sarcastic description",
  "playlistTitle": "custom Spotify playlist title",
  "playlistTheme": "emotional theme description",
  "recommendations": {
    "books": ["book1", "book2", "book3"],
    "movies": ["movie1", "movie2", "movie3"],
    "shows": ["show1", "show2", "show3"]
  },
  "therapyReasons": ["reason1", "reason2", "reason3"],
  "psychologicalSummary": "short, eerily accurate psychological summary",
  "archetype": "quirky archetype like 'The Enlightened Troll'",
  "peakSpiralHour": "guess their emotional witching hour with sarcastic comment",
  "aestheticDiagnosis": "assign a Tumblr-core aesthetic with description",
  "copingMechanisms": ["🧃 mechanism1", "🧸 mechanism2", "💅 mechanism3", "🌙 mechanism4"],
  "unhingedComment": "most emotionally feral comment for dramatic reading",
  "moodTrend": "mock sentiment analysis with ironic chart description"
}

Make it funny, a little too real, and meme-friendly. Use Gen Z language and be sarcastic but not mean.

Reddit User Data:
Comments: ${JSON.stringify(redditData.comments.slice(0, 10))}
Subreddits: ${JSON.stringify(redditData.subreddits.slice(0, 10))}
Post Count: ${redditData.postCount}
Total Score: ${redditData.totalScore}`

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    
    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Error generating analysis:', error)
    
    // Fallback response if AI fails
    return {
      vibeScore: Math.floor(Math.random() * 10) + 1,
      vibeDescription: "Your digital aura is giving 'chronically online but make it aesthetic' ✨",
      playlistTitle: "Songs for Scrolling at 3AM",
      playlistTheme: "Melancholic indie vibes with a dash of existential dread",
      recommendations: {
        books: ["The Midnight Library", "Anxious People", "Digital Minimalism"],
        movies: ["Her", "Black Mirror: San Junipero", "The Social Dilemma"],
        shows: ["BoJack Horseman", "Russian Doll", "The Good Place"]
      },
      therapyReasons: [
        "Your comment history reads like a diary you forgot was public 📖",
        "You argue with strangers about things that won't matter in 5 years 🤡",
        "Your sleep schedule is more chaotic than your Reddit activity 😴"
      ],
      psychologicalSummary: "You're the type of person who uses humor to deflect from real emotions while simultaneously oversharing in comment threads. Classic defense mechanism with a side of digital validation seeking.",
      archetype: "The Philosophical Lurker",
      peakSpiralHour: "Your vibe peaks at 2:47 AM on weekdays. Therapy opens at 9 AM bestie.",
      aestheticDiagnosis: "Your soul smells like lavender candles and unfinished creative projects. Diagnosis: Cottagecore-Academic-Chaotic-Neutral.",
      copingMechanisms: ["🧃 emotional support juice box", "🧸 inner child meditation podcast", "💅 2am self-care rituals", "🌙 moon water manifestation"],
      unhingedComment: "I can't believe I'm having this conversation about cereal rankings at 3 AM but here we are and I have OPINIONS",
      moodTrend: "Your emotional graph looks like a seismograph during an earthquake. Peak chaos occurs during Mercury retrograde (coincidence? I think not)."
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required bestie 💀' },
        { status: 400 }
      )
    }

    // Check if Gemini API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not found, using fallback response')
    }

    // Fetch Reddit data
    const redditPosts = await fetchRedditData(username)
    
    if (redditPosts.length === 0) {
      return NextResponse.json(
        { error: 'No Reddit activity found for this user or profile is private 🔒' },
        { status: 404 }
      )
    }

    // Analyze Reddit data
    const redditData = analyzeRedditData(redditPosts)

    // Generate AI analysis
    const analysis = await generateAnalysis(redditData)

    return NextResponse.json(analysis)

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Something went wrong analyzing this user. Maybe they\'re too powerful for our AI? 🤖💀' },
      { status: 500 }
    )
  }
}