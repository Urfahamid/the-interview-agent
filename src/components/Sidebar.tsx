import React from 'react';
import { LayoutDashboard, Bot, Database, Activity, Settings, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'interview', label: 'Interview', icon: Bot },
    { id: 'curriculum', label: 'Curriculum', icon: Database },
    { id: 'results', label: 'Results', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-80 bg-[#0e0e0e]/70 backdrop-blur-2xl z-50 flex flex-col border-r border-[#3b494b]/20 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00f0ff] via-[#ce5dff] to-[#ebb2ff] p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          <div className="w-full h-full bg-[#131313] rounded-[10px] flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#00f0ff]" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-['JetBrains_Mono'] text-[#dbfcff] text-[18px] font-bold tracking-widest uppercase">
            Interview
          </span>
          <span className="font-['JetBrains_Mono'] text-[#ebb2ff] text-[12px] tracking-widest uppercase opacity-90">
            Agent
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-4 rounded-xl transition-all group text-left ${
                isActive
                  ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_20px_rgba(0,240,255,0.4)] font-bold'
                  : 'text-[#b9cacb] hover:text-[#dbfcff] hover:bg-[#201f1f]/50'
              }`}
            >
              <Icon className={`w-5 h-5 mr-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Uptime Widget */}
      <div className="p-5 mx-4 mb-6 rounded-xl bg-[#2a2a2a]/40 border border-[#3b494b]/20 backdrop-blur-md">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ebb2ff]" />
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#ebb2ff] uppercase tracking-wider">
              Uptime
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]" />
        </div>
        <div className="text-[#b9cacb] text-[11px] font-['JetBrains_Mono'] opacity-80">
          System Integrity: 100%
        </div>
      </div>
    </aside>
  );
};
