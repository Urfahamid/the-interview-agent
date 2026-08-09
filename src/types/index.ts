export interface CandidateMember {
  id: string;
  name: string;
  jobRole: string;
  yearsExperience: number;
  education: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
}

export interface CandidateMission {
  day: number;
  title: string;
  passed?: boolean;
  skipped?: boolean;
  attempts?: number;
}

export interface CandidateSignals {
  commitDays: number;
  missionsCompleted: number;
  missionsFirstTry: number;
}

export interface CandidateData {
  member: CandidateMember;
  missions: CandidateMission[];
  signals: CandidateSignals;
}

export interface CurriculumDay {
  day: number;
  title: string;
  type: 'SETUP' | 'BUILD' | 'AI_CORE' | 'SHIP_IT' | 'LEARN' | 'OPTIMIZE' | 'CAPSTONE';
  tools: string[];
  objectives: string[];
}

export interface CurriculumModule {
  n: number;
  title: string;
  days: [number, number];
}

export interface CurriculumData {
  cohort: string;
  modules: CurriculumModule[];
  days: CurriculumDay[];
}

export interface ChatMessage {
  id: string;
  sender: 'Architect_Prime' | 'Candidate' | 'System';
  text: string;
  timestamp: string;
  tags?: string[];
  score?: string;
  isThinking?: boolean;
}

export interface InterviewFeedback {
  summary: string;
  strengths: string[];
  gaps: string[];
  next: string[];
  readinessScore?: number;
  readinessLabel?: string;
  recommendation?: string;
  metrics?: {
    clarity: number;
    conciseness: number;
    technicalDepth: number;
  };
}

export interface InterviewSession {
  sessionId: string;
  candidateId: string;
  candidateName: string;
  candidateRole: string;
  timerSeconds: number;
  status: 'ACTIVE' | 'COMPLETED';
  messages: ChatMessage[];
  feedback?: InterviewFeedback;
  activeModuleTitle?: string;
  activeModuleProgress?: number;
  contextTags?: string[];
}
