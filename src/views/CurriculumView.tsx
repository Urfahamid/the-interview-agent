import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Circle, Clock, Play, Code2, Wrench, Layers, Cpu, Compass } from 'lucide-react';
import { CURRICULUM_DATA } from '../data/curriculum';
import { CurriculumDay } from '../types';

export const CurriculumView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<CurriculumDay>(CURRICULUM_DATA.days[6]); // Default D-07
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filterCategories = [
    { id: 'ALL', label: 'All Modules' },
    { id: 'RAG', label: 'RAG' },
    { id: 'Vector DBs', label: 'Vector DBs' },
    { id: 'Prompt Eng', label: 'Prompt Eng' },
    { id: 'Agentic AI', label: 'Agentic AI' },
    { id: 'MCP', label: 'MCP' },
    { id: 'AI Deployment', label: 'AI Deployment' },
    { id: 'Production AI', label: 'Production AI' }
  ];

  const getStatusForDay = (dayNum: number) => {
    if (dayNum < 22) return 'COMPLETED';
    if (dayNum === 22) return 'IN_PROGRESS';
    return 'LOCKED';
  };

  return (
    <div className="flex flex-col w-full z-10 pb-16 pt-2">
      {/* Curriculum Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-5 h-5 text-[#00f0ff]" />
            <span className="font-['JetBrains_Mono'] text-[12px] text-[#00f0ff] uppercase tracking-widest font-bold">
              Master Node Architecture
            </span>
          </div>
          <h1 className="font-['JetBrains_Mono'] text-3xl lg:text-4xl font-bold text-[#e5e2e1]">
            Curriculum Explorer
          </h1>
        </div>

        {/* Phase Complete Widget */}
        <div className="flex items-center gap-6 bg-[#131313] px-6 py-4 rounded-2xl border border-[#3b494b]/30">
          <div className="flex flex-col items-end">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#849495] uppercase tracking-wider">
              Phase Complete
            </span>
            <span className="font-['JetBrains_Mono'] text-2xl font-bold text-[#00f0ff]">
              32%
            </span>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center">
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
                strokeDasharray="32, 100"
                strokeWidth="3.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 custom-scrollbar">
        {filterCategories.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-5 py-2.5 rounded-xl font-['JetBrains_Mono'] text-[12px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === filter.id
                ? 'bg-[#00f0ff] text-[#00363a] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-[#1c1b1b]/80 text-[#b9cacb] hover:text-[#e5e2e1] border border-[#3b494b]/20'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Layout Grid: Days Grid & Day Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Days Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRICULUM_DATA.days.map((day) => {
            const status = getStatusForDay(day.day);
            const isSelected = selectedDay.day === day.day;

            return (
              <div
                key={day.day}
                onClick={() => setSelectedDay(day)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#201f1f] border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                    : 'bg-[#1c1b1b]/80 border-[#3b494b]/20 hover:border-[#00f0ff]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00f0ff] px-2.5 py-1 bg-[#00f0ff]/10 rounded border border-[#00f0ff]/30">
                    D-{day.day.toString().padStart(2, '0')}
                  </span>

                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold px-2.5 py-0.5 rounded bg-[#353534] text-[#b9cacb]">
                    {day.type}
                  </span>
                </div>

                <h3 className="font-['Sora'] text-base font-semibold text-[#e5e2e1] mb-4 group-hover:text-[#00f0ff] transition-colors">
                  {day.title}
                </h3>

                <div className="flex items-center justify-between pt-4 border-t border-[#3b494b]/20 text-[11px] font-['JetBrains_Mono']">
                  <span className="text-[#849495]">{day.tools.length} Tools</span>

                  {status === 'COMPLETED' && (
                    <span className="flex items-center gap-1.5 text-[#00f0ff] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                  {status === 'IN_PROGRESS' && (
                    <span className="flex items-center gap-1.5 text-[#ebb2ff] font-semibold">
                      <Clock className="w-3.5 h-3.5 animate-spin" /> In Progress
                    </span>
                  )}
                  {status === 'LOCKED' && (
                    <span className="flex items-center gap-1.5 text-[#849495]">
                      <Circle className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 4 Cols: Day Detail Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#1c1b1b]/90 backdrop-blur-2xl rounded-[2rem] p-8 border border-[#3b494b]/30 shadow-2xl sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ebb2ff] px-3 py-1 bg-[#ebb2ff]/10 rounded border border-[#ebb2ff]/30 uppercase">
                Day {selectedDay.day} Detail
              </span>
              <span className="text-[11px] font-['JetBrains_Mono'] text-[#00f0ff] font-bold">
                {selectedDay.type}
              </span>
            </div>

            <h2 className="font-['JetBrains_Mono'] text-2xl font-bold text-[#e5e2e1] mb-6">
              {selectedDay.title}
            </h2>

            {/* Objectives */}
            <div className="mb-8">
              <h4 className="font-['JetBrains_Mono'] text-xs font-bold text-[#849495] uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#00f0ff]" /> Learning Objectives
              </h4>
              <ul className="space-y-3">
                {selectedDay.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-['Sora'] text-[#b9cacb]">
                    <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="font-['JetBrains_Mono'] text-xs font-bold text-[#849495] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#ebb2ff]" /> Tech Stack Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDay.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#201f1f] text-[#e5e2e1] rounded-lg border border-[#3b494b]/30 text-xs font-['JetBrains_Mono'] font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full py-4 bg-[#00f0ff] text-[#00363a] font-['JetBrains_Mono'] font-bold text-sm rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
              <Play className="w-4 h-4 fill-current" /> Resume Lab Environment
            </button>
          </div>

          {/* Topology Graph Card */}
          <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl rounded-[2rem] p-6 border border-[#3b494b]/30 shadow-xl">
            <h4 className="font-['JetBrains_Mono'] text-xs font-bold text-[#849495] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00f0ff]" /> Skill Tree Topology
            </h4>
            <div className="p-4 bg-[#131313] rounded-xl border border-[#3b494b]/20 flex flex-col gap-3">
              <div className="flex justify-between text-xs font-['JetBrains_Mono'] text-[#b9cacb]">
                <span>Node Dependency</span>
                <span className="text-[#00f0ff]">Satisfied</span>
              </div>
              <div className="h-1.5 bg-[#353534] rounded-full overflow-hidden">
                <div className="h-full bg-[#00f0ff] w-[100%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
