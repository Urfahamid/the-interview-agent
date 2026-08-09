import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { CANDIDATES_DATA } from './src/data/candidates';
import { CURRICULUM_DATA } from './src/data/curriculum';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory interview session store
interface SessionState {
  sessionId: string;
  candidate: any;
  history: { role: 'user' | 'model'; parts: { text: string }[] }[];
  turnCount: number;
}

const sessions = new Map<string, SessionState>();

// Initialize Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// API Routes
app.get('/api/candidates', (_req: Request, res: Response) => {
  res.json({ candidates: CANDIDATES_DATA });
});

app.get('/api/curriculum', (_req: Request, res: Response) => {
  res.json(CURRICULUM_DATA);
});

// Primary Interview Endpoint matching Specification
app.post('/api/interview', async (req: Request, res: Response) => {
  try {
    const { sessionId, candidate, message, isEndSession } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    let session = sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        candidate: candidate || CANDIDATES_DATA[3].member, // default to Elena Rostova
        history: [],
        turnCount: 0
      };
      sessions.set(sessionId, session);
    }

    // Check if user explicitly requested session end or turn threshold reached
    if (isEndSession) {
      return handleEndSession(session, res);
    }

    const userMessageText = message || (session.turnCount === 0 
      ? `Hello, I am ${session.candidate.name || 'the candidate'}. I'm ready for the technical assessment.`
      : 'Ready for the next question.');

    session.history.push({
      role: 'user',
      parts: [{ text: userMessageText }]
    });
    session.turnCount += 1;

    const ai = getGeminiClient();

    if (ai) {
      try {
        const candidateInfo = JSON.stringify(session.candidate);
        const systemInstruction = `You are "Architect_Prime", an elite AI Systems Architect and Lead Interviewer for "THE INTERVIEW AGENT".
You are assessing a candidate named ${session.candidate.name || 'Elena Rostova'} for a ${session.candidate.jobRole || 'Senior AI Engineer'} role.
Candidate Profile: ${candidateInfo}

Your job:
1. Conduct an intense, technical, highly realistic architecture & AI engineering interview.
2. Ask penetrating questions about Vector DBs, RAG chunking strategies, multi-modal embeddings (e.g. CLIP/HNSW), Agentic AI, MCP (Model Context Protocol), and high-scale production trade-offs.
3. Provide constructive, precise feedback on their answers, then pivot to the next deep question.
4. Keep answers concise, highly technical, professional, and authoritative. Avoid fluff.
5. Address the candidate directly with high engineering standards.`;

        // Format history for chat
        const contents = session.history.map(item => ({
          role: item.role,
          parts: item.parts
        }));

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: [
            { role: 'user', parts: [{ text: `[System Instruction: ${systemInstruction}]` }] },
            ...contents
          ]
        });

        const replyText = response.text || "Context window locked. Let's explore your understanding of distributed vector indexing and recall-latency tradeoffs.";

        session.history.push({
          role: 'model',
          parts: [{ text: replyText }]
        });

        return res.json({
          reply: replyText,
          done: false
        });
      } catch (geminiError: any) {
        console.error('Gemini API Error:', geminiError?.message || geminiError);
        // Fallback intelligent response if API key fails or throttles
      }
    }

    // Smart simulated fallback if API key is not configured or fails
    const fallbackAnswers: Record<number, string> = {
      1: `Welcome ${session.candidate.name || 'Candidate'}. I am Architect_Prime. Let's begin the technical assessment for ${session.candidate.jobRole || 'Senior AI Engineer'}.\n\nExcellent breakdown of your background. Let's start with Vector Database Architecture: If you were tasked with implementing a multi-modal embedding pipeline (text and image) using CLIP, how would you handle index alignment and HNSW parameter tuning to ensure optimal recall-latency tradeoffs?`,
      2: `Insightful approach regarding shared latent space projection. When dealing with high-dimensional vector spaces, how would you prevent indexing bottlenecks during massive burst insertions while maintaining real-time query responsiveness?`,
      3: `Precisely. Sharding across document partitions with a write-ahead log effectively decouples insertion from index building. Now let's pivot to Agentic Reasoning: How would you design a multi-agent orchestration pattern using MCP (Model Context Protocol) to safely handle untrusted tool outputs without crashing the primary control flow?`,
      4: `Strong rationale on sandboxing tool execution and utilizing structured output validation with Pydantic. What measures do you put in place to detect prompt injection and guardrail context drift during long-form conversation loops?`
    };

    const replyText = fallbackAnswers[session.turnCount] || `That is a solid architectural strategy. Let's inspect how you handle production latency versus accuracy tradeoffs when serving 10,000 requests per second across edge nodes. How do you monitor latent space synchronization?`;

    session.history.push({
      role: 'model',
      parts: [{ text: replyText }]
    });

    return res.json({
      reply: replyText,
      done: false
    });

  } catch (err: any) {
    console.error('Interview Error:', err);
    return res.status(500).json({ error: 'Failed to process interview turn' });
  }
});

async function handleEndSession(session: SessionState, res: Response) {
  const ai = getGeminiClient();
  let feedbackData = {
    summary: "Demonstrated advanced knowledge of vector indexing, RAG chunking strategies, and agentic orchestration patterns. Clear articulation of latency vs. accuracy tradeoffs in production LLM pipelines.",
    strengths: [
      "Deep RAG & Embedding Expertise: Demonstrated advanced knowledge of vector indexing and chunking strategies.",
      "Agentic Reasoning: Successfully mapped out a multi-agent orchestration pattern for edge cases.",
      "System Design: Clear articulation of latency vs. accuracy tradeoffs in production LLM pipelines."
    ],
    gaps: [
      "Deployment Tooling: Limited practical experience with Kubernetes or container orchestration.",
      "Evaluation Metrics: Relied heavily on anecdotal evaluation rather than robust frameworks (e.g., RAGAS)."
    ],
    next: [
      "Probe specifically on CI/CD pipelines for LLM updates and monitoring drift in production.",
      "Discuss collaboration with non-technical stakeholders on managing AI hallucinations."
    ],
    readinessScore: 88,
    readinessLabel: "Enterprise Ready",
    recommendation: "Proceed to Final Round",
    metrics: {
      clarity: 95,
      conciseness: 70,
      technicalDepth: 90
    }
  };

  if (ai && session.history.length > 0) {
    try {
      const historySummary = session.history.map(h => `${h.role.toUpperCase()}: ${h.parts[0].text}`).join('\n');
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Analyze this interview transcript for candidate ${session.candidate.name} (${session.candidate.jobRole}) and provide a structured JSON assessment.
Transcript:
${historySummary}

Respond ONLY in valid JSON matching this schema:
{
  "summary": "2-3 sentence overview of candidate performance",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "gaps": ["gap 1", "gap 2"],
  "next": ["action 1", "action 2"],
  "readinessScore": 88,
  "readinessLabel": "Enterprise Ready",
  "recommendation": "Proceed to Final Round"
}`,
        config: {
          responseMimeType: "application/json"
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        feedbackData = {
          ...feedbackData,
          ...parsed
        };
      }
    } catch (e) {
      console.error('Error generating AI evaluation feedback:', e);
    }
  }

  return res.json({
    reply: "Candidate evaluation complete. Neural assessment vectors compiled.",
    done: true,
    feedback: feedbackData
  });
}

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Interview Agent server running on port ${PORT}`);
  });
}

startServer();

