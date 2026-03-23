// User Profile
export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  county: string;
  kcseGrade: string;
  isFoundationPath: boolean;
}

// Genuine Student Responses
export interface GSResponses {
  returnIncentives: string;
  economicCircumstances: string;
  studyRationale: string;
  careerGoals: string;
}

// Language Scores
export interface LanguageScores {
  testType: 'IELTS' | 'PTE' | 'TOEFL';
  overall: string;
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
}

// Financial Data
export interface Financials {
  selectedTuition: number;
  fundsAvailable: string;
}

// University
export interface University {
  id: number;
  name: string;
  city: string;
  state: string;
  isRegional: boolean;
  pswBonus: number;
  avgTuition: number;
  cricos: string;
  ranking: number;
  courses: string[];
}

// Visa Checklist Item
export interface VisaChecklistItem {
  id: number;
  item: string;
  description: string;
  mandatory: boolean;
}

// University Filter
export interface UniversityFilter {
  search: string;
  regionalOnly: boolean;
  maxTuition: number;
}

// Step Definition
export interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Grade Points Map
export type GradePointsMap = {
  [key: string]: number;
};
