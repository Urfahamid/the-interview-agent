import React from 'react';
import { User, ChevronDown, Radio } from 'lucide-react';
import { CandidateData } from '../types';

interface HeaderProps {
  candidates: CandidateData[];
  selectedCandidate: CandidateData;
  onSelectCandidate: (candidate: CandidateData) => void;
}

export const Header: React.FC<HeaderProps> = ({
  candidates,
  selectedCandidate,
  onSelectCandidate,
}) => {
  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-[#131313]/60 backdrop-blur-md border-b border-[#3b494b]/20 z-40 flex items-center justify-between px-8">
      {/* Status & Candidate Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-[#1c1b1b]/80 px-4 py-2 rounded-full border border-[#3b494b]/30 shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ebb2ff] shadow-[0_0_8px_#ebb2ff] animate-pulse" />
          <span className="font-['JetBrains_Mono'] text-[12px] text-[#b9cacb]">
            Candidate Status:{' '}
            <span className="text-[#00f0ff] font-semibold">Live Stream Active</span>
          </span>
        </div>

        {/* Candidate Dropdown */}
        <div className="relative group">
          <select
            value={selectedCandidate.member.id}
            onChange={(e) => {
              const found = candidates.find((c) => c.member.id === e.target.value);
              if (found) onSelectCandidate(found);
            }}
            className="appearance-none bg-[#201f1f]/90 text-[#e5e2e1] font-['JetBrains_Mono'] text-[12px] py-2 pl-4 pr-10 rounded-full border border-[#00f0ff]/30 focus:border-[#00f0ff] focus:outline-none cursor-pointer hover:border-[#00f0ff]/60 transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)]"
          >
            {candidates.map((cand) => (
              <option key={cand.member.id} value={cand.member.id} className="bg-[#131313] text-[#e5e2e1]">
                {cand.member.name} ({cand.member.jobRole})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#00f0ff] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Admin Profile */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="font-['JetBrains_Mono'] text-[12px] text-[#e5e2e1] font-bold tracking-wide">
            Admin Node 01
          </span>
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#00f0ff]/80 uppercase tracking-wider font-semibold">
            Access Level 5
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#00f0ff] flex items-center justify-center border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <User className="w-5 h-5 text-[#00363a]" />
        </div>
      </div>
    </header>
  );
};
