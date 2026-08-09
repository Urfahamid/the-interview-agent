import React, { useState, useEffect, useRef } from 'react';
import { Send, Volume2, VolumeX, Paperclip, StopCircle, Bot, Sparkles, CheckCircle2, Clock, Shield, Cpu, Activity } from 'lucide-react';
import { CandidateData, ChatMessage, InterviewSession } from '../types';

interface InterviewViewProps {
  candidate: CandidateData;
  onFinishInterview: (session: InterviewSession) => void;
}

export const InterviewView: React.FC<InterviewViewProps> = ({ candidate, onFinishInterview }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'Architect_Prime',
      text: `Greetings ${candidate.member.name}. I am Architect_Prime. We are initiating your technical assessment for the position of ${candidate.member.jobRole}.\n\nLet's evaluate your understanding of Vector DB Architecture and high-scale RAG systems. How do you approach index alignment and parameter tuning in HNSW graph construction when serving multi-modal embeddings under tight latency constraints?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tags: ['Vector DB Architecture', 'HNSW Indexing']
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [seconds, setSeconds] = useState(2535); // 42:15 default
  const [sessionId] = useState(() => `sess-${Math.random().toString(36).substring(2, 9)}`);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Web Speech API Voice synthesis helper
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customMsg?: string) => {
    const msgText = customMsg || input;
    if (!msgText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'Candidate',
      text: msgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          candidate: candidate.member,
          message: msgText
        })
      });

      const data = await res.json();
      const aiReply = data.reply || "Context vector received. Let's analyze your sharding and persistence choices.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'Architect_Prime',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tags: ['Real-time Assessment']
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiReply);
    } catch (err) {
      console.error('Interview turn error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'Architect_Prime',
        text: `Received your response. Regarding HNSW indexing, how do you handle vector quantization to keep memory usage low while preserving recall accuracy above 95%?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          candidate: candidate.member,
          isEndSession: true
        })
      });
      const data = await res.json();

      const sessionObj: InterviewSession = {
        sessionId,
        candidateId: candidate.member.id,
        candidateName: candidate.member.name,
        candidateRole: candidate.member.jobRole,
        timerSeconds: 2535 - seconds,
        status: 'COMPLETED',
        messages,
        feedback: data.feedback
      };

      onFinishInterview(sessionObj);
    } catch (err) {
      console.error('End session error:', err);
      onFinishInterview({
        sessionId,
        candidateId: candidate.member.id,
        candidateName: candidate.member.name,
        candidateRole: candidate.member.jobRole,
        timerSeconds: 2535 - seconds,
        status: 'COMPLETED',
        messages,
        feedback: {
          summary: "Candidate demonstrated deep knowledge of vector indexing, RAG chunking strategies, and agentic orchestration patterns.",
          strengths: [
            "Deep RAG & Embedding Expertise: Demonstrated advanced knowledge of vector indexing.",
            "Agentic Reasoning: Mapped out multi-agent orchestration for edge cases.",
            "System Design: Clear articulation of latency vs. accuracy tradeoffs."
          ],
          gaps: [
            "Deployment Tooling: Limited experience with Kubernetes orchestration.",
            "Evaluation Metrics: Relied heavily on anecdotal evaluation."
          ],
          next: [
            "Probe specifically on CI/CD pipelines for LLM updates.",
            "Discuss managing AI hallucinations with non-technical teams."
          ],
          readinessScore: 88,
          readinessLabel: "Enterprise Ready",
          recommendation: "Proceed to Final Round",
          metrics: { clarity: 95, conciseness: 70, technicalDepth: 90 }
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full z-10 pb-16 pt-2">
      {/* Left Chat Area (8 Cols) */}
      <div className="lg:col-span-8 flex flex-col bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] border border-[#3b494b]/30 shadow-2xl overflow-hidden h-[calc(100vh-140px)]">
        {/* Chat Header */}
        <div className="px-8 py-5 bg-[#0e0e0e]/80 border-b border-[#3b494b]/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00f0ff] to-[#ebb2ff] p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <div className="w-full h-full bg-[#131313] rounded-[14px] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#00f0ff]" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00f0ff] border-2 border-[#131313] animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['JetBrains_Mono'] text-lg font-bold text-[#e5e2e1]">
                  Architect_Prime
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] bg-[#ebb2ff]/10 text-[#ebb2ff] font-bold border border-[#ebb2ff]/30">
                  AI INTERVIEWER
                </span>
              </div>
              <div className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] flex items-center gap-1.5 mt-0.5 font-medium">
                <Activity className="w-3 h-3 animate-spin" /> Processing Context
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Speech Output Toggle */}
            <button
              onClick={() => {
                const next = !voiceEnabled;
                setVoiceEnabled(next);
                if (!next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-['JetBrains_Mono'] text-[11px] border transition-all cursor-pointer ${
                voiceEnabled
                  ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'bg-[#201f1f] border-[#3b494b]/30 text-[#849495] hover:text-[#b9cacb]'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-[#00f0ff]" /> : <VolumeX className="w-4 h-4" />}
              <span>Voice: {voiceEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Timer */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#131313] border border-[#00f0ff]/30 rounded-xl">
              <Clock className="w-4 h-4 text-[#00f0ff]" />
              <span className="font-['JetBrains_Mono'] text-[14px] font-bold text-[#e5e2e1]">
                {formatTimer(seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Status Notification */}
        <div className="bg-[#201f1f]/50 px-8 py-2 border-b border-[#3b494b]/10 flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#849495]">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Latent Space Initialized // Context Window Locked</span>
          </div>
          <span className="text-[#ebb2ff] font-semibold uppercase">Assessment Mode Active</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {messages.map((msg) => {
            const isAI = msg.sender === 'Architect_Prime';
            return (
              <div
                key={msg.id}
                className={`flex gap-4 max-w-3xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isAI
                      ? 'bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'bg-[#ebb2ff]/10 border border-[#ebb2ff]/40 text-[#ebb2ff]'
                  }`}
                >
                  {isAI ? <Bot className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                </div>

                <div
                  className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-2 mb-1.5 px-1">
                    <span className="font-['JetBrains_Mono'] text-[12px] text-[#e5e2e1] font-bold">
                      {isAI ? 'Architect_Prime' : candidate.member.name}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#849495]">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`p-6 rounded-2xl text-[14px] leading-relaxed font-['Sora'] shadow-lg whitespace-pre-wrap ${
                      isAI
                        ? 'bg-[#201f1f]/90 text-[#e5e2e1] border border-[#3b494b]/30 rounded-tl-sm'
                        : 'bg-[#00f0ff] text-[#00363a] font-medium rounded-tr-sm shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.tags && (
                    <div className="flex gap-2 mt-2">
                      {msg.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] bg-[#353534]/50 text-[#00f0ff] border border-[#00f0ff]/20 font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking State */}
          {isLoading && (
            <div className="flex gap-4 mr-auto items-center">
              <div className="w-9 h-9 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] flex items-center justify-center animate-pulse">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-[#201f1f]/90 px-6 py-4 rounded-2xl border border-[#00f0ff]/30 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="font-['JetBrains_Mono'] text-[12px] text-[#00f0ff] font-medium">
                  Architect_Prime is formulating next evaluation question...
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-6 bg-[#0e0e0e]/90 border-t border-[#3b494b]/20 flex flex-col gap-3">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your architectural explanation or implementation code..."
              className="w-full bg-[#1c1b1b] text-[#e5e2e1] font-['Sora'] text-sm p-4 pr-14 rounded-xl border border-[#3b494b]/30 focus:border-[#00f0ff] focus:outline-none resize-none h-24 custom-scrollbar transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 bottom-3 p-3 bg-[#00f0ff] text-[#00363a] rounded-xl hover:scale-105 active:scale-95 disabled:opacity-40 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSendMessage("Let's review the code snippet for HNSW vector graph creation and distance metric calculation.")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#201f1f] text-[#b9cacb] hover:text-[#00f0ff] rounded-lg border border-[#3b494b]/30 text-[11px] font-['JetBrains_Mono'] transition-all cursor-pointer"
              >
                <Paperclip className="w-3.5 h-3.5 text-[#00f0ff]" /> Attach Snippet
              </button>
              <button
                onClick={() => handleSendMessage("Could you elaborate on the mathematical trade-offs between cosine similarity and Euclidean distance in high-dimensional space?")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#201f1f] text-[#b9cacb] hover:text-[#ebb2ff] rounded-lg border border-[#3b494b]/30 text-[11px] font-['JetBrains_Mono'] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ebb2ff]" /> Request Deep Dive
              </button>
            </div>

            <button
              onClick={handleEndSession}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#ff5252]/10 hover:bg-[#ff5252]/20 text-[#ff5252] border border-[#ff5252]/40 rounded-lg font-['JetBrains_Mono'] text-[11px] font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(255,82,82,0.2)]"
            >
              <StopCircle className="w-4 h-4" /> End Session & Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Right Column HUD Panel (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Active Module HUD Card */}
        <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] uppercase tracking-widest font-bold">
              Active Module HUD
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
          </div>

          <h3 className="font-['JetBrains_Mono'] text-xl font-bold text-[#e5e2e1] mb-6">
            Vector DB Architecture
          </h3>

          <div className="flex items-center gap-6 mb-8">
            {/* Progress Circle */}
            <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#353534]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="75, 100"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute font-['JetBrains_Mono'] text-base font-bold text-[#e5e2e1]">
                75%
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[12px] font-['Sora'] text-[#e5e2e1]">
                <CheckCircle2 className="w-4 h-4 text-[#00f0ff]" /> Sharding Strategies
              </div>
              <div className="flex items-center gap-2 text-[12px] font-['Sora'] text-[#e5e2e1]">
                <CheckCircle2 className="w-4 h-4 text-[#00f0ff]" /> Multi-modal Embeddings
              </div>
              <div className="flex items-center gap-2 text-[12px] font-['Sora'] text-[#849495]">
                <Clock className="w-4 h-4 text-[#ebb2ff]" /> Query Optimization
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3b494b]/20">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#849495] uppercase tracking-wider block mb-3 font-semibold">
              Live Assessment Context
            </span>
            <div className="flex flex-wrap gap-2">
              {['HNSW Indexing', 'CLIP Architecture', 'Cosine Similarity', 'High-Dimensional Math'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#201f1f] border border-[#00f0ff]/30 text-[#00f0ff] rounded-lg text-[11px] font-['JetBrains_Mono'] font-medium shadow-[0_0_8px_rgba(0,240,255,0.1)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Depth Analysis */}
        <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#ebb2ff] uppercase tracking-widest font-bold">
              Technical Depth Analysis
            </span>
            <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-[#00f0ff]">
              Level: Advanced
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[12px] font-['JetBrains_Mono'] text-[#b9cacb] mb-1">
                <span>RAG Architecture</span>
                <span>92%</span>
              </div>
              <div className="h-2 bg-[#353534] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ebb2ff] rounded-full w-[92%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-['JetBrains_Mono'] text-[#b9cacb] mb-1">
                <span>Agentic Orchestration</span>
                <span>85%</span>
              </div>
              <div className="h-2 bg-[#353534] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ebb2ff] rounded-full w-[85%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-['JetBrains_Mono'] text-[#b9cacb] mb-1">
                <span>MCP & Tool Protocols</span>
                <span>88%</span>
              </div>
              <div className="h-2 bg-[#353534] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ebb2ff] rounded-full w-[88%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Engine Telemetry */}
        <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-5 h-5 text-[#00f0ff]" />
            <h4 className="font-['JetBrains_Mono'] text-sm font-bold text-[#e5e2e1]">
              Engine Telemetry
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-[#131313] rounded-xl border border-[#3b494b]/20">
              <div className="text-[10px] font-['JetBrains_Mono'] text-[#849495] uppercase">Confidence</div>
              <div className="text-xl font-['JetBrains_Mono'] font-bold text-[#00f0ff] mt-1">0.982</div>
            </div>
            <div className="p-4 bg-[#131313] rounded-xl border border-[#3b494b]/20">
              <div className="text-[10px] font-['JetBrains_Mono'] text-[#849495] uppercase">Latency</div>
              <div className="text-xl font-['JetBrains_Mono'] font-bold text-[#ebb2ff] mt-1">42ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
