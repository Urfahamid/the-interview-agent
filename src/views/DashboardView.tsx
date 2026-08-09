import React from 'react';
import { Rocket, Calendar, Award, Wifi, ArrowRight, Radar } from 'lucide-react';
import { CandidateData } from '../types';

interface DashboardViewProps {
  candidate: CandidateData;
  onStartInterview: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ candidate, onStartInterview }) => {
  const commitDays = candidate.signals?.commitDays || 22;
  const missionsCount = candidate.signals?.missionsCompleted || 14;

  return (
    <div className="flex flex-col w-full relative z-10 pb-16">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00f0ff]/5 via-transparent to-transparent pointer-events-none -z-10"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ebb2ff]/5 rounded-full blur-2xl pointer-events-none -z-10"></div>

      {/* Hero Session Banner */}
      <section className="mb-8 mt-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#201f1f]/60 backdrop-blur-xl p-10 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#3b494b]/30 group">
          {/* Subtle gradient highlights & Orbiting Rings */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00f0ff]/10 to-transparent pointer-events-none opacity-50 transition-opacity duration-700 group-hover:opacity-100"></div>
          <div className="absolute -top-10 -right-10 w-[500px] h-[500px] border border-[#00f0ff]/20 rounded-full opacity-30 animate-[spin_60s_linear_infinite] pointer-events-none">
            <div className="absolute top-1/2 left-0 w-4 h-4 bg-[#00f0ff] shadow-[0_0_15px_#00f0ff] -mt-2 -ml-2 rounded-full"></div>
          </div>
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] border border-[#ebb2ff]/10 rounded-full opacity-20 animate-[spin_90s_linear_infinite_reverse] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 bg-[#ebb2ff] rounded-sm shadow-[0_0_10px_#ebb2ff] animate-pulse"></span>
              <span className="font-['JetBrains_Mono'] text-[#ebb2ff] text-[12px] uppercase tracking-[0.2em] font-semibold">
                Session Initialization
              </span>
            </div>
            <h1 className="font-['JetBrains_Mono'] text-4xl lg:text-5xl font-bold text-[#e5e2e1] mb-6 leading-tight drop-shadow-md">
              Ready for your next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ebb2ff]">
                milestone?
              </span>
            </h1>
            <p className="font-['Sora'] text-lg text-[#b9cacb] mb-8 max-w-xl leading-relaxed">
              The neural assessment engine is primed for <span className="text-[#dbfcff] font-semibold">{candidate.member.name}</span>. Your latest learning vectors indicate high proficiency in conversational architecture.
            </p>
            <button
              onClick={onStartInterview}
              className="relative inline-flex items-center justify-center px-8 py-4 font-['JetBrains_Mono'] font-bold text-[16px] text-[#00363a] bg-[#00f0ff] rounded-xl overflow-hidden group shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              <Rocket className="w-5 h-5 mr-3 text-[#00363a]" />
              Start New Interview
            </button>
          </div>

          <div className="absolute bottom-8 right-8 text-right hidden md:block">
            <div className="font-['JetBrains_Mono'] text-[12px] text-[#00f0ff]/60 uppercase tracking-widest">
              System Status
            </div>
            <div className="font-['JetBrains_Mono'] text-[13px] text-[#b9cacb] font-semibold">
              V 4.0.1 // OPTIMAL
            </div>
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left Column: Stats & Activity Log */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Days Completed */}
            <div className="bg-[#1c1b1b]/80 backdrop-blur-md rounded-2xl p-6 border border-[#3b494b]/20 shadow-lg relative overflow-hidden group hover:border-[#00f0ff]/40 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-['JetBrains_Mono'] text-[12px] text-[#849495] uppercase tracking-widest font-medium">
                  Days Completed
                </span>
                <Calendar className="w-5 h-5 text-[#00f0ff]/60" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-['JetBrains_Mono'] text-[52px] font-bold text-[#e5e2e1] leading-none">
                  {commitDays}
                </span>
                <span className="font-['JetBrains_Mono'] text-xl text-[#849495]">/31</span>
              </div>
              <div className="mt-6 h-1.5 bg-[#353534] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] rounded-full transition-all duration-1000"
                  style={{ width: `${Math.round((commitDays / 31) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Missions */}
            <div className="bg-[#1c1b1b]/80 backdrop-blur-md rounded-2xl p-6 border border-[#3b494b]/20 shadow-lg relative overflow-hidden group hover:border-[#ebb2ff]/40 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ebb2ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-['JetBrains_Mono'] text-[12px] text-[#849495] uppercase tracking-widest font-medium">
                  Missions
                </span>
                <Award className="w-5 h-5 text-[#ebb2ff]/60" />
              </div>
              <div className="font-['JetBrains_Mono'] text-[52px] font-bold text-[#e5e2e1] leading-none">
                {missionsCount}
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="text-[#00f0ff] text-[11px] font-['JetBrains_Mono'] bg-[#00f0ff]/10 px-2.5 py-1 rounded-md font-semibold">
                  +3 this week
                </span>
              </div>
            </div>

            {/* Signal Strength */}
            <div className="bg-[#1c1b1b]/80 backdrop-blur-md rounded-2xl p-6 border border-[#3b494b]/20 shadow-lg relative overflow-hidden group hover:border-[#00dbe9]/40 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00dbe9]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-['JetBrains_Mono'] text-[12px] text-[#849495] uppercase tracking-widest font-medium">
                  Signal Str
                </span>
                <Wifi className="w-5 h-5 text-[#00dbe9]/60" />
              </div>
              <div className="font-['JetBrains_Mono'] text-[52px] font-bold text-[#e5e2e1] leading-none">
                94<span className="text-[28px] text-[#849495]">%</span>
              </div>
              <div className="mt-6 flex items-end h-4 gap-1.5">
                <div className="w-full bg-[#00dbe9]/20 rounded-t h-[40%]"></div>
                <div className="w-full bg-[#00dbe9]/40 rounded-t h-[60%]"></div>
                <div className="w-full bg-[#00dbe9]/60 rounded-t h-[80%]"></div>
                <div className="w-full bg-[#00dbe9] shadow-[0_0_8px_#00dbe9] rounded-t h-full animate-pulse"></div>
                <div className="w-full bg-[#00dbe9]/80 rounded-t h-[90%]"></div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-[#201f1f]/40 backdrop-blur-md rounded-2xl p-8 border border-[#3b494b]/20 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-['JetBrains_Mono'] text-xl font-bold text-[#e5e2e1]">
                Recent Activity Log
              </h2>
              <button
                onClick={onStartInterview}
                className="font-['JetBrains_Mono'] text-[12px] text-[#00f0ff] hover:text-[#7df4ff] transition-colors flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-[#3b494b]/30">
              {/* Activity Item 1 */}
              <div className="relative pl-10 flex items-start group">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#131313] border-2 border-[#00f0ff] flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                  <div className="w-2 h-2 rounded-full bg-[#00f0ff]"></div>
                </div>
                <div className="flex-1 bg-[#2a2a2a]/30 p-5 rounded-xl border border-[#3b494b]/20 transition-colors group-hover:border-[#00f0ff]/30">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-['Sora'] text-base text-[#e5e2e1] font-semibold">
                      Vector Database Integration
                    </h3>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#849495]">
                      2 hours ago
                    </span>
                  </div>
                  <p className="font-['Sora'] text-sm text-[#b9cacb] leading-relaxed">
                    Successfully completed module on semantic search and embedding storage using Pinecone.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-[#353534] rounded text-[10px] font-['JetBrains_Mono'] text-[#b9cacb] font-medium">
                      RAG
                    </span>
                    <span className="px-2.5 py-1 bg-[#353534] rounded text-[10px] font-['JetBrains_Mono'] text-[#b9cacb] font-medium">
                      EMBEDDINGS
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="relative pl-10 flex items-start group">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#131313] border-2 border-[#ebb2ff] flex items-center justify-center shadow-[0_0_10px_rgba(235,178,255,0.3)]">
                  <div className="w-2 h-2 rounded-full bg-[#ebb2ff]"></div>
                </div>
                <div className="flex-1 bg-[#2a2a2a]/30 p-5 rounded-xl border border-[#3b494b]/20 transition-colors group-hover:border-[#ebb2ff]/30">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-['Sora'] text-base text-[#e5e2e1] font-semibold">
                      Advanced RAG Architecture
                    </h3>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#849495]">
                      Yesterday
                    </span>
                  </div>
                  <p className="font-['Sora'] text-sm text-[#b9cacb] leading-relaxed">
                    Passed assessment on chunking strategies and contextual retrieval generation.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-[#353534] rounded text-[10px] font-['JetBrains_Mono'] text-[#b9cacb] font-medium">
                      ASSESSMENT
                    </span>
                    <span className="px-2.5 py-1 bg-[#00f0ff]/20 text-[#00f0ff] rounded text-[10px] font-['JetBrains_Mono'] font-bold">
                      SCORE: 98%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Readiness Matrix (Radar Chart) */}
        <div className="lg:col-span-4 bg-[#1c1b1b]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00f0ff]/5 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-['JetBrains_Mono'] text-xl font-bold text-[#e5e2e1]">
                Readiness Matrix
              </h2>
              <div className="font-['JetBrains_Mono'] text-[11px] text-[#849495] mt-1 tracking-wider uppercase font-medium">
                Capability Assessment
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#00f0ff]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Radar className="w-5 h-5 text-[#00f0ff]" />
            </div>
          </div>

          {/* SVG Radar Visualization */}
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
            <svg className="w-full max-w-[280px] aspect-square transform -rotate-90" viewBox="0 0 100 100">
              <polygon
                className="text-[#3b494b]/40"
                fill="none"
                points="50,10 90,30 90,70 50,90 10,70 10,30"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <polygon
                className="text-[#3b494b]/30"
                fill="none"
                points="50,25 75,40 75,60 50,75 25,60 25,40"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <polygon
                className="text-[#3b494b]/20"
                fill="none"
                points="50,40 60,45 60,55 50,60 40,55 40,45"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <line className="text-[#3b494b]/40" stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="10" />
              <line className="text-[#3b494b]/40" stroke="currentColor" strokeWidth="0.5" x1="50" x2="90" y1="50" y2="30" />
              <line className="text-[#3b494b]/40" stroke="currentColor" strokeWidth="0.5" x1="50" x2="90" y1="50" y2="70" />
              <line className="text-[#3b494b]/40" stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="90" />
              <line className="text-[#3b494b]/40" stroke="currentColor" strokeWidth="0.5" x1="50" x2="10" y1="50" y2="70" />
              <line className="text-[#3b494b]/40" stroke="currentColor" strokeWidth="0.5" x1="50" x2="10" y1="50" y2="30" />
              
              {/* Animated Polygon */}
              <polygon
                className="drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] animate-[pulse_4s_ease-in-out_infinite]"
                fill="rgba(0, 240, 255, 0.18)"
                points="50,15 82,34 70,68 50,85 20,62 30,35"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />
              <circle cx="50" cy="15" fill="#00f0ff" r="2.5" />
              <circle cx="82" cy="34" fill="#00f0ff" r="2.5" />
              <circle cx="70" cy="68" fill="#00f0ff" r="2.5" />
              <circle cx="50" cy="85" fill="#00f0ff" r="2.5" />
              <circle cx="20" cy="62" fill="#00f0ff" r="2.5" />
              <circle cx="30" cy="35" fill="#00f0ff" r="2.5" />
            </svg>

            {/* Labels overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-['JetBrains_Mono'] text-[10px] text-[#e5e2e1] whitespace-nowrap bg-[#0e0e0e]/80 px-1.5 py-0.5 rounded border border-[#3b494b]/30">
                Agentic AI
              </span>
              <span className="absolute top-[25%] right-[5%] translate-x-1/2 -translate-y-1/2 font-['JetBrains_Mono'] text-[10px] text-[#e5e2e1] whitespace-nowrap bg-[#0e0e0e]/80 px-1.5 py-0.5 rounded border border-[#3b494b]/30">
                MCP
              </span>
              <span className="absolute top-[75%] right-[5%] translate-x-1/2 -translate-y-1/2 font-['JetBrains_Mono'] text-[10px] text-[#e5e2e1] whitespace-nowrap bg-[#0e0e0e]/80 px-1.5 py-0.5 rounded border border-[#3b494b]/30">
                RAG
              </span>
              <span className="absolute bottom-[5%] left-1/2 -translate-x-1/2 translate-y-1/2 font-['JetBrains_Mono'] text-[10px] text-[#e5e2e1] whitespace-nowrap bg-[#0e0e0e]/80 px-1.5 py-0.5 rounded border border-[#3b494b]/30">
                Tool Use
              </span>
              <span className="absolute top-[75%] left-[5%] -translate-x-1/2 -translate-y-1/2 font-['JetBrains_Mono'] text-[10px] text-[#e5e2e1] whitespace-nowrap bg-[#0e0e0e]/80 px-1.5 py-0.5 rounded border border-[#3b494b]/30">
                Prompts
              </span>
              <span className="absolute top-[25%] left-[5%] -translate-x-1/2 -translate-y-1/2 font-['JetBrains_Mono'] text-[10px] text-[#e5e2e1] whitespace-nowrap bg-[#0e0e0e]/80 px-1.5 py-0.5 rounded border border-[#3b494b]/30">
                Memory
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#3b494b]/20">
            <div className="flex justify-between items-center">
              <span className="font-['JetBrains_Mono'] text-[12px] text-[#b9cacb]">
                Global Sync Rate
              </span>
              <span className="font-['JetBrains_Mono'] text-[14px] font-bold text-[#00f0ff]">
                87.4%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
