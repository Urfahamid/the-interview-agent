import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, Download, Share2, FileText, ChevronDown, ChevronUp, UserCheck, Check, Sparkles } from 'lucide-react';
import { CandidateData, InterviewSession } from '../types';

interface ResultsViewProps {
  candidate: CandidateData;
  session?: InterviewSession;
  onRestart: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ candidate, session, onRestart }) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [copied, setCopied] = useState(false);

  const feedback = session?.feedback || {
    summary: `${candidate.member.name} demonstrated advanced knowledge of vector indexing, RAG chunking strategies, and agentic orchestration patterns. Clear articulation of latency vs. accuracy tradeoffs in production LLM pipelines.`,
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
    metrics: { clarity: 95, conciseness: 70, technicalDepth: 90 }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`The Interview Agent Evaluation Report - ${candidate.member.name} (${candidate.member.jobRole})\nScore: ${feedback.readinessScore}% - ${feedback.recommendation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full z-10 pb-16 pt-2 print:p-0 print:bg-white print:text-black">
      {/* Printable Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-2xl print:bg-white print:border-black print:shadow-none">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="w-5 h-5 text-[#00f0ff]" />
            <span className="font-['JetBrains_Mono'] text-[12px] text-[#00f0ff] uppercase tracking-widest font-bold">
              Candidate Evaluation Complete
            </span>
          </div>
          <h1 className="font-['JetBrains_Mono'] text-3xl lg:text-4xl font-bold text-[#e5e2e1] print:text-black">
            {candidate.member.name}
          </h1>
          <p className="font-['Sora'] text-sm text-[#b9cacb] mt-1 print:text-gray-700">
            {candidate.member.jobRole} • {candidate.member.yearsExperience} Years Experience • {candidate.member.education}
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3 print:hidden">
          <span className="px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] font-['JetBrains_Mono'] text-xs font-bold rounded-xl shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            {feedback.recommendation}
          </span>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#201f1f] hover:bg-[#353534] text-[#e5e2e1] border border-[#3b494b]/30 rounded-xl font-['JetBrains_Mono'] text-xs font-bold transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#00f0ff]" /> Export PDF
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#00f0ff] text-[#00363a] font-['JetBrains_Mono'] text-xs font-bold rounded-xl transition-all hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Copied Link' : 'Share Report'}
          </button>
        </div>
      </div>

      {/* Main Grid: Score Gauge & Summary Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Radial Score Gauge (4 Cols) */}
        <div className="lg:col-span-4 bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-2xl flex flex-col items-center justify-center text-center">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#849495] uppercase tracking-wider mb-6">
            Readiness Score
          </span>

          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#353534]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-[#00f0ff] drop-shadow-[0_0_12px_#00f0ff]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${feedback.readinessScore || 88}, 100`}
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-['JetBrains_Mono'] text-5xl font-bold text-[#e5e2e1]">
                {feedback.readinessScore || 88}%
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#00f0ff] uppercase tracking-wider mt-1 font-semibold">
                {feedback.readinessLabel || 'Enterprise Ready'}
              </span>
            </div>
          </div>

          <p className="font-['Sora'] text-sm text-[#b9cacb] leading-relaxed">
            {feedback.summary}
          </p>
        </div>

        {/* Right Column: Communication & Strengths Bento (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Communication & Technical Depth Meters */}
          <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl">
            <h3 className="font-['JetBrains_Mono'] text-sm font-bold text-[#e5e2e1] uppercase tracking-wider mb-6">
              Communication & Technical Depth
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-[#131313] rounded-2xl border border-[#3b494b]/20">
                <div className="flex justify-between items-center text-xs font-['JetBrains_Mono'] text-[#849495] mb-2">
                  <span>Clarity</span>
                  <span className="text-[#00f0ff] font-bold">{feedback.metrics?.clarity || 95}%</span>
                </div>
                <div className="h-2 bg-[#353534] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00f0ff] rounded-full"
                    style={{ width: `${feedback.metrics?.clarity || 95}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-[#131313] rounded-2xl border border-[#3b494b]/20">
                <div className="flex justify-between items-center text-xs font-['JetBrains_Mono'] text-[#849495] mb-2">
                  <span>Conciseness</span>
                  <span className="text-[#ebb2ff] font-bold">{feedback.metrics?.conciseness || 70}%</span>
                </div>
                <div className="h-2 bg-[#353534] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ebb2ff] rounded-full"
                    style={{ width: `${feedback.metrics?.conciseness || 70}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-[#131313] rounded-2xl border border-[#3b494b]/20">
                <div className="flex justify-between items-center text-xs font-['JetBrains_Mono'] text-[#849495] mb-2">
                  <span>Technical Depth</span>
                  <span className="text-[#00f0ff] font-bold">{feedback.metrics?.technicalDepth || 90}%</span>
                </div>
                <div className="h-2 bg-[#353534] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00f0ff] rounded-full"
                    style={{ width: `${feedback.metrics?.technicalDepth || 90}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Growth Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl">
              <h3 className="font-['JetBrains_Mono'] text-xs font-bold text-[#00f0ff] uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00f0ff]" /> Key Strengths
              </h3>
              <ul className="space-y-3">
                {feedback.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-['Sora'] text-[#e5e2e1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shrink-0 mt-2"></span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Growth */}
            <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl">
              <h3 className="font-['JetBrains_Mono'] text-xs font-bold text-[#ebb2ff] uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#ebb2ff]" /> Areas for Growth
              </h3>
              <ul className="space-y-3">
                {feedback.gaps.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-['Sora'] text-[#e5e2e1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ebb2ff] shrink-0 mt-2"></span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan for Next Interviewer */}
      <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl mb-8">
        <h3 className="font-['JetBrains_Mono'] text-sm font-bold text-[#e5e2e1] uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#00f0ff]" /> Suggested Action Plan for Final Interviewer
        </h3>
        <ul className="space-y-3">
          {feedback.next.map((n, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm font-['Sora'] text-[#b9cacb]">
              <ArrowRight className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Session Transcript */}
      {session?.messages && session.messages.length > 0 && (
        <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] border border-[#3b494b]/30 shadow-xl overflow-hidden print:hidden">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full p-8 flex items-center justify-between font-['JetBrains_Mono'] text-base font-bold text-[#e5e2e1] hover:text-[#00f0ff] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#00f0ff]" />
              <span>Full Interview Transcript ({session.messages.length} Exchanges)</span>
            </div>
            {showTranscript ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {showTranscript && (
            <div className="p-8 pt-0 border-t border-[#3b494b]/20 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
              {session.messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl text-sm font-['Sora'] ${
                    m.sender === 'Architect_Prime'
                      ? 'bg-[#131313] text-[#e5e2e1] border-l-4 border-[#00f0ff]'
                      : 'bg-[#201f1f] text-[#00f0ff] border-l-4 border-[#ebb2ff]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1 text-xs font-['JetBrains_Mono'] font-bold">
                    <span>{m.sender}</span>
                    <span className="text-[#849495]">{m.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
