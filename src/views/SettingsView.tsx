import React, { useState } from 'react';
import { Settings, Cpu, Shield, Volume2, CheckCircle2, RefreshCw } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [persona, setPersona] = useState('Architect_Prime');
  const [rigor, setRigor] = useState('ENTERPRISE');
  const [model, setModel] = useState('gemini-3.6-flash');
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col w-full z-10 pb-16 pt-2 max-w-4xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center">
          <Settings className="w-5 h-5 text-[#00f0ff]" />
        </div>
        <div>
          <h1 className="font-['JetBrains_Mono'] text-3xl font-bold text-[#e5e2e1]">
            System Settings
          </h1>
          <p className="font-['Sora'] text-sm text-[#b9cacb]">
            Configure neural interviewer persona, model execution parameters, and audio settings
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Persona Tuning */}
        <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl">
          <h3 className="font-['JetBrains_Mono'] text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00f0ff]" /> Interviewer System Persona
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'Architect_Prime', name: 'Architect_Prime', desc: 'Authoritative, deep systems architecture & vector indexing focus.' },
              { id: 'Staff_Engineer', name: 'Staff Engineer', desc: 'Focus on code clean structure, API contracts, and testing.' },
              { id: 'AI_Researcher', name: 'Lead AI Researcher', desc: 'Focus on foundational math, attention mechanisms, and embeddings.' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPersona(item.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  persona === item.id
                    ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-[#e5e2e1] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-[#131313] border-[#3b494b]/20 text-[#b9cacb] hover:border-[#00f0ff]/40'
                }`}
              >
                <div className="font-['JetBrains_Mono'] text-sm font-bold mb-1 text-[#00f0ff]">
                  {item.name}
                </div>
                <div className="font-['Sora'] text-xs text-[#849495] leading-relaxed">
                  {item.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Assessment Rigor */}
        <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl">
          <h3 className="font-['JetBrains_Mono'] text-sm font-bold text-[#ebb2ff] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#ebb2ff]" /> Assessment Rigor Level
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'STANDARD', name: 'Standard', desc: 'Core concept verification & gentle follow-ups.' },
              { id: 'ENTERPRISE', name: 'Enterprise', desc: 'Production trade-offs, edge cases, and architectural depth.' },
              { id: 'HARDCORE', name: 'Hardcore', desc: 'Intense scenario stress testing and live debugging.' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setRigor(item.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  rigor === item.id
                    ? 'bg-[#ebb2ff]/10 border-[#ebb2ff] text-[#e5e2e1] shadow-[0_0_15px_rgba(235,178,255,0.2)]'
                    : 'bg-[#131313] border-[#3b494b]/20 text-[#b9cacb] hover:border-[#ebb2ff]/40'
                }`}
              >
                <div className="font-['JetBrains_Mono'] text-sm font-bold mb-1 text-[#ebb2ff]">
                  {item.name}
                </div>
                <div className="font-['Sora'] text-xs text-[#849495] leading-relaxed">
                  {item.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Synthesizer Controls */}
        <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-xl">
          <h3 className="font-['JetBrains_Mono'] text-sm font-bold text-[#e5e2e1] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#00f0ff]" /> Audio & Speech Rate
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-['JetBrains_Mono'] text-[#b9cacb]">
              <span>Speech Speed: {voiceSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.5"
              step="0.1"
              value={voiceSpeed}
              onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
              className="w-full accent-[#00f0ff] cursor-pointer"
            />
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={handleSave}
            className="px-8 py-4 bg-[#00f0ff] text-[#00363a] font-['JetBrains_Mono'] font-bold text-sm rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {saved ? <CheckCircle2 className="w-5 h-5 text-[#00363a]" /> : null}
            {saved ? 'Configuration Saved' : 'Save Configuration'}
          </button>

          <button
            onClick={() => {
              setPersona('Architect_Prime');
              setRigor('ENTERPRISE');
              setModel('gemini-3.6-flash');
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#201f1f] text-[#849495] hover:text-[#e5e2e1] border border-[#3b494b]/30 rounded-xl font-['JetBrains_Mono'] text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Reset System Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
