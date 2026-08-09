import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NeuralBackground } from './components/NeuralBackground';
import { DashboardView } from './views/DashboardView';
import { InterviewView } from './views/InterviewView';
import { CurriculumView } from './views/CurriculumView';
import { ResultsView } from './views/ResultsView';
import { SettingsView } from './views/SettingsView';
import { CANDIDATES_DATA } from './data/candidates';
import { CandidateData, InterviewSession } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [candidates] = useState<CandidateData[]>(CANDIDATES_DATA);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData>(CANDIDATES_DATA[3]); // Elena Rostova
  const [lastFinishedSession, setLastFinishedSession] = useState<InterviewSession | undefined>(undefined);

  const handleStartInterview = () => {
    setActiveTab('interview');
  };

  const handleFinishInterview = (session: InterviewSession) => {
    setLastFinishedSession(session);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] relative selection:bg-[#00f0ff] selection:text-[#00363a]">
      {/* Animated Cyber Background */}
      <NeuralBackground />

      {/* Fixed Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Top Header */}
      <Header
        candidates={candidates}
        selectedCandidate={selectedCandidate}
        onSelectCandidate={(cand) => setSelectedCandidate(cand)}
      />

      {/* Main Content View Container */}
      <main className="pl-80 pt-24 pr-8 min-h-screen flex flex-col">
        {activeTab === 'dashboard' && (
          <DashboardView
            candidate={selectedCandidate}
            onStartInterview={handleStartInterview}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewView
            candidate={selectedCandidate}
            onFinishInterview={handleFinishInterview}
          />
        )}

        {activeTab === 'curriculum' && <CurriculumView />}

        {activeTab === 'results' && (
          <ResultsView
            candidate={selectedCandidate}
            session={lastFinishedSession}
            onRestart={handleStartInterview}
          />
        )}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Fixed Status Footer Bar */}
      <Footer />
    </div>
  );
}

export default App;
