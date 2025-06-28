import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";


const GOOGLE_API_KEY = 'AIzaSyBIljjOW-VWKXCcIDlBdSZ_Kx98KG-UeXg';
const ai = new GoogleGenAI({
  apiKey:GOOGLE_API_KEY, // <-- set this in .env
});







export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

     if (!GOOGLE_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Google GenAI API key not configured. Please add GOOGLE_API_KEY to your environment variables.",
        },
        { status: 500 },
      );
    }

    // Fetch Reddit data
    const redditResponse = await fetch(`https://www.reddit.com/user/${username}.json`, {
      headers: {
        'User-Agent': 'RedditAnalyzer/1.0',
      },
    });

    if (!redditResponse.ok) {
      if (redditResponse.status === 404) {
        return NextResponse.json({ error: 'User not found or profile is private' }, { status: 404 });
      }
      throw new Error(`Reddit API error: ${redditResponse.status}`);
    }

    const redditData = await redditResponse.json();
    console.log('Reddit data fetched successfully:', redditData); //------ Debugging line to check Reddit data
    
    if (!redditData.data || !redditData.data.children || redditData.data.children.length === 0) {
      return NextResponse.json({ error: 'No public activity found for this user' }, { status: 404 });
    }

    // Process Reddit data
    const posts = redditData.data.children;
    const comments = posts.filter((post: any) => post.data.body).slice(0, 50); // Limit to recent 50 comments
    const subreddits = Array.from(new Set(posts.map((post: any) => post.data.subreddit))).slice(0, 10);
    
    // Create account age calculation
    const accountCreated = posts[0]?.data?.created_utc;
    const accountAge = accountCreated 
      ? `${Math.floor((Date.now() / 1000 - accountCreated) / (365 * 24 * 3600))} years`
      : 'Unknown';

    // Prepare data for OpenAI
    const commentTexts = comments.map((comment: any) => comment.data.body).join('\n');
    const redditSummary = {
      totalComments: comments.length,
      topSubreddits: subreddits,
      recentComments: commentTexts.slice(0, 3000), // Limit text length
      accountAge,
    };

    // OpenAI Analysis
    const prompt = `You are a humorous mental wellness AI. Analyze the following Reddit user data and return a JSON response with exactly this structure:

{
  "vibeScore": [number 0-10],
  "vibeDescription": "[one-line sarcastic description]",
  "playlistTitle": "[creative Spotify playlist title]",
  "playlistTheme": "[short emotional theme description]",
  "recommendations": {
    "books": ["book1", "book2", "book3"],
    "movies": ["movie1", "movie2", "movie3"],
    "shows": ["show1", "show2", "show3"]
  },
  "therapyMemes": ["meme-style therapy reason 1", "meme-style therapy reason 2", "meme-style therapy reason 3"],
  "psychologicalSummary": "[eerily accurate 2-3 sentence psychological summary that's funny but insightful]"
}

Make it funny, a little too real, and meme-friendly. Base your analysis on patterns in their comments, subreddit choices, and overall vibe.

Reddit User Data:
Total Comments: ${redditSummary.totalComments}
Top Subreddits: ${redditSummary.topSubreddits.join(', ')}
Account Age: ${redditSummary.accountAge}

Recent Comments Sample:
${redditSummary.recentComments}`;
 // ────────────────────────────────────────────────────────────────────────
    // 4. Ask Gemini for JSON (schema forces correct formatting)
    // ────────────────────────────────────────────────────────────────────────
    const geminiRes = await ai.models.generateContent({
      model: "gemini-2.5-flash", // quick + cheap, change if you need deeper reasoning
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vibeScore: { type: Type.NUMBER },
            vibeDescription: { type: Type.STRING },
            playlistTitle: { type: Type.STRING },
            playlistTheme: { type: Type.STRING },
            recommendations: {
              type: Type.OBJECT,
              properties: {
                books: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                movies: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                shows: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              propertyOrdering: ["books", "movies", "shows"],
            },
            therapyMemes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            psychologicalSummary: { type: Type.STRING },
          },
          propertyOrdering: [
            "vibeScore",
            "vibeDescription",
            "playlistTitle",
            "playlistTheme",
            "recommendations",
            "therapyMemes",
            "psychologicalSummary",
          ],
        },
      },
    });

    const analysisText = geminiRes.text; // guaranteed JSON string

    // ────────────────────────────────────────────────────────────────────────
    // 5. Parse & fall back if needed (logic identical)
    // ────────────────────────────────────────────────────────────────────────
    let analysis: any;
    try {
      analysis = JSON.parse(analysisText ?? '{}');
      console.log('Analysis result:', analysis); //------ Debugging line to check analysis result
    } catch {
      analysis = {
        vibeScore: 5,
        vibeDescription:
          "Your Reddit activity suggests you're human, and that's concerning.",
        playlistTitle: "Songs for Confused Souls",
        playlistTheme: "Existential crisis with a beat",
        recommendations: {
          books: [
            "How to Win Friends and Influence People",
            "The Art of Not Being Governed",
            "Meditations",
          ],
          movies: ["Inside Out", "Her", "The Social Network"],
          shows: ["Black Mirror", "The Good Place", "Community"],
        },
        therapyMemes: [
          "You argue with strangers online more than you talk to friends IRL",
          "Your comment history reads like a diary you never meant to publish",
          "You have strong opinions about things that don't affect your daily life",
        ],
        psychologicalSummary:
          "You're the type of person who has Wikipedia tabs open about topics you'll never use, yet somehow this makes you feel intellectually superior. Classic Reddit behavior, honestly.",
      };
    }

    // ────────────────────────────────────────────────────────────────────────
    // 6. Assemble response
    // ────────────────────────────────────────────────────────────────────────
    const payload = {
      ...analysis,
      username,
      redditStats: {
        totalComments: redditSummary.totalComments,
        topSubreddits: redditSummary.topSubreddits,
        accountAge: redditSummary.accountAge,
      },
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Failed to analyze user data. Please try again." },
      { status: 500 },
    );
  }
}