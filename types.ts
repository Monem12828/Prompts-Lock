
export type AppMode = 'auto' | 'generate' | 'fix' | 'research';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

export interface InteractiveQuestion {
  id: string;
  question: string;
  options: string[];
  allowCustom: boolean;
}

export interface AIResult {
  detectedMode?: AppMode;
  lockedParts: string[];
  improvedParts: string[];
  addedParts: string[];
  finalPrompt: string;
  questions: string[]; // Still keep for text-based clarification
  interactiveQuestions?: InteractiveQuestion[]; // New MCQ-based flow
  assumptions: string[];
  changeLog: {
    kept: number;
    improved: number;
    added: number;
  };
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: AppMode;
  originalInput: string;
  result: AIResult;
  isFavorite: boolean;
}

export interface AppState {
  userInput: string;
  mode: AppMode;
  language: Language;
  history: HistoryEntry[];
  currentResult: AIResult | null;
  isGenerating: boolean;
  error: string | null;
}
