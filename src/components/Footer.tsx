import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-72 right-0 h-12 bg-[#0e0e0e]/90 backdrop-blur-xl border-t border-[#3b494b]/20 flex items-center justify-between px-8 z-40">
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#b9cacb] uppercase tracking-wider">
            API Status:
          </span>
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#00f0ff] font-semibold">
            Connected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#b9cacb] uppercase tracking-wider">
            Engine:
          </span>
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#ebb2ff] font-semibold">
            LLM-AGENT-GEMINI-3.6-FLASH
          </span>
        </div>
      </div>
      <div className="text-[10px] font-['JetBrains_Mono'] text-[#849495] tracking-widest uppercase">
        Latent Space Synchronized // 0.003ms
      </div>
    </footer>
  );
};
