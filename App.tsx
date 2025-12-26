
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppMode, AppState, HistoryEntry, AIResult, Language, InteractiveQuestion } from './types';
import { ICONS, MAX_CHARS, COLORS, TRANSLATIONS, LANGUAGES } from './constants';
import { processPrompt } from './geminiService';

// --- Sub-components ---

const BriefingPanel: React.FC<{ 
  questions: InteractiveQuestion[], 
  onComplete: (answers: string) => void,
  onSkip: () => void,
  language: Language
}> = ({ questions, onComplete, onSkip, language }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customText, setCustomText] = useState("");
  const t = TRANSLATIONS[language];

  const handleFinish = () => {
    const formattedAnswers = Object.entries(answers)
      .map(([id, val]) => {
        const q = questions.find(q => q.id === id);
        return `Q: ${q?.question} A: ${val}`;
      })
      .join('\n');
    
    const finalContext = `${formattedAnswers}\nUser Additional Notes: ${customText}`;
    onComplete(finalContext);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="max-w-2xl w-full glass-card rounded-3xl p-6 md:p-10 border border-lime-400/30 shadow-2xl shadow-lime-400/10 flex flex-col max-h-[90vh]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-lime-400 rounded-lg text-black animate-pulse">
            <ICONS.Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">{t.aiDetected}</h2>
            <p className="text-xs text-lime-400/70 font-bold uppercase tracking-widest">Incomplete Vision Detected • Need Clarification</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2 scrollbar-none">
          {questions.map((q) => (
            <div key={q.id} className="space-y-4">
              <h3 className="text-sm md:text-base font-bold text-white/90 border-l-2 border-lime-400 pl-3">{q.question}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      answers[q.id] === opt 
                        ? 'bg-lime-400 border-lime-400 text-black font-bold shadow-lg shadow-lime-400/20 scale-[1.02]' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Any other specific constraints?</h3>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. Must be written in Python, use AWS, or focus on accessibility..."
              className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-lime-400/50 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-8 border-t border-white/10 mt-6">
          <button 
            onClick={onSkip}
            className="flex-1 py-4 px-4 text-xs font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors"
          >
            Skip & Architect Anyway
          </button>
          <button 
            onClick={handleFinish}
            disabled={Object.keys(answers).length === 0 && !customText}
            className="flex-[2] py-4 px-4 bg-lime-400 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            Seal Briefing & Finalize
          </button>
        </div>
      </div>
    </div>
  );
};

const Tutorial: React.FC<{ language: Language, onComplete: () => void }> = ({ language, onComplete }) => {
  const [step, setStep] = useState(0);
  const t = TRANSLATIONS[language];
  
  const steps = t.tutorial.map((s: any, i: number) => ({
    ...s,
    icon: i === 0 ? <ICONS.Lock className="w-12 h-12 text-lime-400" /> :
          i === 1 ? <ICONS.Brain className="w-12 h-12 text-lime-400" /> :
          i === 2 ? <div className="p-3 bg-lime-400 rounded-full text-black"><ICONS.Lock className="w-8 h-8" /></div> :
          i === 3 ? <ICONS.History className="w-12 h-12 text-lime-400" /> :
                    <ICONS.Star className="w-12 h-12 text-lime-400" />
  }));

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-lime-400/20 shadow-2xl shadow-lime-400/10 text-center space-y-6">
        <div className="flex justify-center">{steps[step].icon}</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">{steps[step].title}</h2>
          <p className="text-sm text-white/60 leading-relaxed">{steps[step].desc}</p>
        </div>
        
        <div className="flex items-center justify-center gap-1.5 py-4">
          {steps.map((_: any, i: number) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-lime-400' : 'w-2 bg-white/10'}`} />
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={onComplete} className="flex-1 py-3 px-4 text-xs font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors">{t.skip}</button>
          <button onClick={next} className="flex-[2] py-3 px-4 bg-lime-400 text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all">{step === steps.length - 1 ? t.enterLab : t.next}</button>
        </div>
      </div>
    </div>
  );
};

const ModeSelector: React.FC<{ mode: AppMode, language: Language, setMode: (m: AppMode) => void }> = ({ mode, language, setMode }) => {
  const t = TRANSLATIONS[language];
  const modes: { id: AppMode, label: string, desc: string }[] = [
    { id: 'auto', label: t.modes.auto.label, desc: t.modes.auto.desc },
    { id: 'generate', label: t.modes.generate.label, desc: t.modes.generate.desc },
    { id: 'fix', label: t.modes.fix.label, desc: t.modes.fix.desc },
    { id: 'research', label: t.modes.research.label, desc: t.modes.research.desc }
  ];

  return (
    <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10 w-full overflow-x-auto scrollbar-none">
      {modes.map(m => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`flex-none md:flex-1 px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
            mode === m.id 
              ? 'bg-lime-400 text-black font-bold shadow-lg shadow-lime-400/20' 
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="text-[9px] md:text-xs uppercase tracking-widest leading-none flex items-center gap-1 justify-center">
            {m.id === 'auto' && <ICONS.Brain className="w-3 h-3" />}
            {m.label}
          </div>
          <div className="hidden md:block text-[9px] opacity-70 mt-0.5 uppercase">{m.desc}</div>
        </button>
      ))}
    </div>
  );
};

const InsightCard: React.FC<{ title: string, items: string[], color?: string, icon?: React.ReactNode }> = ({ title, items, color = "text-white", icon }) => {
  if (items.length === 0) return null;
  return (
    <div className="glass-card rounded-xl p-5 mb-4 border-l-4" style={{ borderLeftColor: color === 'text-lime-400' ? '#A3E635' : (color === 'text-yellow-400' ? '#FACC15' : '#60A5FA') }}>
      <div className={`flex items-center gap-2 mb-3 font-bold uppercase tracking-tighter ${color}`}>
        {icon}
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-white/70 flex gap-2">
            <span className="text-lime-400 mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    userInput: '',
    mode: 'auto',
    language: 'en',
    history: [],
    currentResult: null,
    isGenerating: false,
    error: null,
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'history'>('editor');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showAutoSaveToast, setShowAutoSaveToast] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [pendingQuestions, setPendingQuestions] = useState<InteractiveQuestion[] | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const userInputRef = useRef(state.userInput);

  const t = TRANSLATIONS[state.language];

  const handleTutorialComplete = useCallback(() => {
    setShowTutorial(false);
    localStorage.setItem('prompt_lock_has_seen_tutorial', 'true');
  }, []);

  const getLoadingMessageIndex = (prog: number) => {
    const total = t.loadingMsgs.length;
    const index = Math.min(Math.floor((prog / 100) * total), total - 1);
    return index;
  };

  useEffect(() => {
    userInputRef.current = state.userInput;
  }, [state.userInput]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) highlightRef.current.scrollTop = e.currentTarget.scrollTop;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (userInputRef.current.trim().length > 0 && userInputRef.current.length <= MAX_CHARS) {
        localStorage.setItem('prompt_lock_draft', userInputRef.current);
        setShowAutoSaveToast(true);
        setTimeout(() => setShowAutoSaveToast(false), 3000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: any;
    if (state.isGenerating) {
      setLoadingProgress(0);
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev < 40) return prev + Math.random() * 5;
          if (prev < 75) return prev + Math.random() * 2;
          if (prev < 95) return prev + Math.random() * 0.5;
          if (prev < 99) return prev + 0.05;
          return prev;
        });
      }, 200);
    } else {
      setLoadingProgress(0);
    }
    return () => clearInterval(interval);
  }, [state.isGenerating]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('prompt_lock_history');
    if (savedHistory) {
      try { setState(prev => ({ ...prev, history: JSON.parse(savedHistory) })); } catch (e) {}
    }
    const savedDraft = localStorage.getItem('prompt_lock_draft');
    if (savedDraft) setState(prev => ({ ...prev, userInput: savedDraft }));
    const savedLang = localStorage.getItem('prompt_lock_language') as Language;
    if (savedLang && LANGUAGES[savedLang]) setState(prev => ({ ...prev, language: savedLang }));
    if (!localStorage.getItem('prompt_lock_has_seen_tutorial')) setShowTutorial(true);
  }, []);

  useEffect(() => { localStorage.setItem('prompt_lock_history', JSON.stringify(state.history)); }, [state.history]);
  useEffect(() => { localStorage.setItem('prompt_lock_language', state.language); }, [state.language]);

  const runArchitect = async (contextAnswers?: string) => {
    setState(prev => ({ ...prev, isGenerating: true, error: null }));
    try {
      const result = await processPrompt(state.userInput, state.mode, state.language, contextAnswers);
      
      // If AI asks questions and we haven't provided context yet, show the briefing panel
      if (result.interactiveQuestions && result.interactiveQuestions.length > 0 && !contextAnswers) {
        setPendingQuestions(result.interactiveQuestions);
        setState(prev => ({ ...prev, isGenerating: false }));
        return;
      }

      const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        mode: state.mode,
        originalInput: state.userInput,
        result: result,
        isFavorite: false
      };

      setState(prev => ({ ...prev, currentResult: result, history: [newEntry, ...prev.history], isGenerating: false }));
      localStorage.removeItem('prompt_lock_draft');
      setPendingQuestions(null);
    } catch (err: any) {
      setState(prev => ({ ...prev, isGenerating: false, error: err.message }));
    }
  };

  const handleGenerate = () => {
    if (state.userInput.length === 0) { setState(prev => ({ ...prev, error: t.errorEmpty })); return; }
    if (state.userInput.length > MAX_CHARS) { setState(prev => ({ ...prev, error: t.errorTooLong })); return; }
    runArchitect();
  };

  const handleBriefingComplete = (answers: string) => {
    setPendingQuestions(null);
    runArchitect(answers);
  };

  const handleDownload = (result: AIResult) => {
    const sections: string[] = [];
    sections.push(`====================================================\n PROMPT LOCK - ARCHITECTURAL SPECIFICATION\n====================================================`);
    if (result.detectedMode) sections.push(`[SYSTEM_DETECTION]\nAI Intelligence suggests: ${result.detectedMode.toUpperCase()} Mode`);
    if (result.lockedParts && result.lockedParts.length > 0) sections.push(`[UNCHANGED_CORE]\n${result.lockedParts.map(p => `• ${p}`).join('\n')}`);
    if (result.improvedParts && result.improvedParts.length > 0) sections.push(`[REFINEMENTS]\n${result.improvedParts.map(p => `• ${p}`).join('\n')}`);
    if (result.addedParts && result.addedParts.length > 0) sections.push(`[INJECTED_SPECIFICATIONS]\n${result.addedParts.map(p => `• ${p}`).join('\n')}`);
    if (result.finalPrompt) sections.push(`[FINAL_ARCHITECT_ARTIFACT]\n----------------------------------------------------\n${result.finalPrompt}\n----------------------------------------------------`);
    if (result.questions && result.questions.length > 0) sections.push(`[CRITICAL_QUESTIONS_FOR_USER]\n${result.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`);
    if (result.assumptions && result.assumptions.length > 0) sections.push(`[ARCHITECTURAL_ASSUMPTIONS]\n${result.assumptions.map(a => `• ${a}`).join('\n')}`);
    if (result.changeLog) sections.push(`[ARTIFACT_METRICS]\n- Items Kept: ${result.changeLog.kept}\n- Items Refined: ${result.changeLog.improved}\n- Items Added: ${result.changeLog.added}`);

    const blob = new Blob([sections.join('\n\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PromptLock_Artifact_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderHighlightedText = () => {
    const text = state.userInput;
    if (text.length <= MAX_CHARS) return text;
    return (
      <>{text.slice(0, MAX_CHARS)}<span className="bg-red-500/30 text-red-500 font-bold">{text.slice(MAX_CHARS)}</span></>
    );
  };

  // Helper to check if we are in chat mode
  const isChatMode = state.currentResult?.detectedMode === 'CHAT';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden pb-24 md:pb-0 font-['Inter',_sans-serif]">
      {showTutorial && <Tutorial language={state.language} onComplete={handleTutorialComplete} />}
      
      {pendingQuestions && (
        <BriefingPanel 
          questions={pendingQuestions} 
          language={state.language} 
          onComplete={handleBriefingComplete} 
          onSkip={() => { setPendingQuestions(null); runArchitect("User skipped briefing questions."); }} 
        />
      )}

      {/* MOBILE HEADER */}
      <div className="md:hidden bg-black/80 backdrop-blur-md p-4 border-b border-white/10 flex justify-between items-center z-50 sticky top-0">
        <h1 className="font-bold tracking-tighter text-xl text-lime-400">PROMPT<span className="text-white">LOCK</span></h1>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('editor')} className={`text-sm font-bold tracking-tight ${activeTab === 'editor' ? 'text-lime-400' : 'text-white/50'}`}>{t.create}</button>
          <button onClick={() => setActiveTab('history')} className={`text-sm font-bold tracking-tight ${activeTab === 'history' ? 'text-lime-400' : 'text-white/50'}`}>{t.history}</button>
        </div>
      </div>

      {/* SIDEBAR (DESKTOP) */}
      <div className="hidden md:flex flex-col w-80 bg-[#050505] border-r border-white/10 h-screen">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-bold tracking-tighter text-2xl flex items-center gap-2">
            <span className="p-1 bg-lime-400 rounded text-black"><ICONS.Lock width={20} height={20}/></span>
            PROMPT<span className="text-lime-400">LOCK</span>
          </h1>
          <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase mt-2">{t.subtitle}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2 px-2">{t.recentGens}</div>
          {state.history.length === 0 ? (
            <div className="px-2 py-8 text-center text-white/20 text-sm">{t.noArtifacts}</div>
          ) : (
            state.history.map(item => (
              <div 
                key={item.id} 
                onClick={() => setState(prev => ({ ...prev, currentResult: item.result, userInput: item.originalInput, mode: item.mode }))}
                className={`group glass-card p-3 rounded-xl border transition-all cursor-pointer hover:neon-border ${state.currentResult === item.result ? 'neon-border bg-lime-400/5' : 'border-white/5'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] text-lime-400/70 font-mono">#{item.id.slice(-4)}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setState(prev => ({ ...prev, history: prev.history.map(h => h.id === item.id ? {...h, isFavorite: !h.isFavorite} : h)})); }} className={`${item.isFavorite ? 'text-lime-400' : 'text-white/30'} hover:text-lime-400`}>
                      <ICONS.Star width={14} height={14} fill={item.isFavorite ? 'currentColor' : 'none'}/>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setState(prev => ({ ...prev, history: prev.history.filter(h => h.id !== item.id)})); }} className="text-white/30 hover:text-red-500">
                      <ICONS.Trash width={14} height={14}/>
                    </button>
                  </div>
                </div>
                <div className="text-xs font-medium truncate mb-2 uppercase">{item.originalInput.slice(0, 50)}...</div>
                <div className="flex justify-between items-center text-[9px] text-white/30 uppercase tracking-widest">
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  <span className="bg-white/5 px-2 py-0.5 rounded">{t.modes[item.mode].label}</span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-white/10 bg-black/50">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white transition-all text-sm uppercase"><ICONS.Sparkles width={16}/> {t.upgradePro}</button>
        </div>
      </div>

      <main className={`flex-1 flex flex-col min-h-screen md:h-screen transition-all ${activeTab === 'history' ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex-1 flex flex-col md:flex-row h-full">
          <div className="flex-1 p-4 md:p-8 flex flex-col overflow-y-auto scrollbar-none">
            <div className="max-w-4xl w-full mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{t.labTitle}</h2>
                  <p className="text-sm text-white/40">{t.labDesc}</p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                   <select value={state.language} onChange={(e) => setState(prev => ({ ...prev, language: e.target.value as Language }))} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white/60 focus:outline-none uppercase">{Object.entries(LANGUAGES).map(([code, name]) => (<option key={code} value={code} className="bg-black">{name}</option>))}</select>
                   <ModeSelector mode={state.mode} language={state.language} setMode={(m) => setState(prev => ({ ...prev, mode: m }))} />
                </div>
              </div>

              <div className={`relative glass-card rounded-2xl border ${state.userInput.length > MAX_CHARS ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10 focus-within:border-lime-400/50'} overflow-hidden h-[250px] md:h-[400px]`}>
                <div ref={highlightRef} className="absolute inset-0 p-4 md:p-6 text-base md:text-lg leading-relaxed whitespace-pre-wrap break-words pointer-events-none text-transparent overflow-hidden">{renderHighlightedText()}</div>
                <textarea ref={textareaRef} value={state.userInput} onScroll={handleScroll} onChange={(e) => setState(prev => ({ ...prev, userInput: e.target.value, error: null }))} placeholder={t.placeholder} className="absolute inset-0 w-full h-full bg-transparent p-4 md:p-6 text-base md:text-lg leading-relaxed resize-none focus:outline-none placeholder:text-white/10 scrollbar-none text-white selection:bg-lime-400/30 caret-lime-400" spellCheck="false" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center pointer-events-none">
                  <div className={`text-[10px] md:text-[11px] font-mono tracking-widest px-2 py-0.5 rounded ${state.userInput.length > MAX_CHARS ? 'bg-red-500 text-white' : 'text-white/30'}`}>{state.userInput.length.toLocaleString()} / 1,000</div>
                  {state.error && <div className="text-[10px] text-red-400 font-bold uppercase">{state.error}</div>}
                </div>
              </div>

              {state.currentResult && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-[0.3em] text-white/50">{t.archOutput}</h3>
                      {state.currentResult.detectedMode && <span className="text-[10px] font-black text-lime-400 uppercase tracking-tighter flex items-center gap-1"><ICONS.Brain className="w-3 h-3"/> {t.aiDetected}: {state.currentResult.detectedMode}</span>}
                    </div>
                    {/* Hide download button in CHAT mode */}
                    {!isChatMode && (
                      <button onClick={() => handleDownload(state.currentResult!)} className="flex items-center gap-2 text-xs font-bold text-lime-400 hover:bg-lime-400/10 px-4 py-2 rounded-lg border border-lime-400/30 transition-all"><ICONS.Download width={16}/> {t.download}</button>
                    )}
                  </div>

                  {/* CHAT MODE RENDER vs ARCHITECT RENDER */}
                  {isChatMode ? (
                     <div className="glass-card rounded-2xl border border-lime-400/30 p-8 flex items-start gap-4 animate-in fade-in zoom-in-95 duration-500">
                        <div className="p-3 bg-lime-400 rounded-full text-black shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                           <ICONS.Brain className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-sm font-bold text-lime-400 uppercase tracking-widest">PromptLock AI</h3>
                           <p className="text-lg md:text-xl font-medium leading-relaxed">{state.currentResult.finalPrompt}</p>
                        </div>
                     </div>
                  ) : (
                    <div className="glass-card rounded-2xl border border-white/10 p-6 md:p-8 mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap selection:bg-lime-400 selection:text-black">{state.currentResult.finalPrompt}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL - Conditional Rendering for Chat */}
          <div className="w-full md:w-96 bg-[#080808] border-l border-white/10 overflow-y-auto p-6 flex flex-col scrollbar-none">
            <div className="flex items-center gap-2 mb-8"><div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div><h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">{t.insightsTitle}</h3></div>
            
            {state.isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="relative"><div className="w-24 h-24 border-2 border-lime-400/10 border-t-lime-400 rounded-full animate-[spin_1s_linear_infinite]"></div><div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-black font-mono text-lime-400">{Math.floor(loadingProgress)}%</span></div></div>
                <div className="text-center"><p className="text-lg font-bold tracking-tight animate-pulse transition-all">{t.loadingMsgs[getLoadingMessageIndex(loadingProgress)]}</p><p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">{t.loadingActive}</p></div>
              </div>
            ) : state.currentResult ? (
              // HIDE INSIGHTS IN CHAT MODE
              isChatMode ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                   <div className="p-4 rounded-full bg-white/5 mb-4">
                      <ICONS.Sparkles className="w-8 h-8 text-lime-400" />
                   </div>
                   <p className="text-sm font-bold text-white/80">Conversational Mode Active</p>
                   <p className="text-xs text-white/40 mt-2">Ready to switch back to Architecture anytime.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {[['kept', 'text-lime-400'], ['improved', 'text-blue-400'], ['added', 'text-purple-400']].map(([key, color]) => (<div key={key} className="bg-white/5 p-3 rounded-xl border border-white/10 text-center"><div className={`text-xl font-bold ${color}`}>{(state.currentResult?.changeLog as any)[key]}</div><div className="text-[8px] uppercase tracking-widest opacity-40">{t[key]}</div></div>))}
                  </div>
                  <InsightCard title={t.locked} icon={<ICONS.Lock width={14}/>} items={state.currentResult.lockedParts} color="text-lime-400" />
                  <InsightCard title={t.clarifications} items={state.currentResult.questions} color="text-yellow-400" />
                  <InsightCard title={t.assumptions} items={state.currentResult.assumptions} color="text-blue-400" />
                </div>
              )
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20"><ICONS.History width={48} height={48}/><p className="text-sm px-10 mt-4">{t.insightsEmpty}</p></div>
            )}
          </div>
        </div>

        <div className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 z-[60]">
          <button onClick={handleGenerate} disabled={state.isGenerating || state.userInput.length > MAX_CHARS} className={`group relative flex items-center gap-3 px-10 py-5 font-black uppercase tracking-tighter rounded-full shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:grayscale ${state.userInput.length > MAX_CHARS ? 'bg-red-500 text-white' : 'bg-lime-400 text-black shadow-lime-400/30 hover:scale-105 active:scale-95'}`}>{state.isGenerating ? (<><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>{t.architecting}</>) : state.userInput.length > MAX_CHARS ? (<><ICONS.Lock width={20}/> LIMIT</>) : (<><ICONS.Sparkles width={20}/>{t.genArtifact}</>)}</button>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 flex justify-around p-4 z-50">
        <button onClick={() => setActiveTab('editor')} className={`flex flex-col items-center gap-1 ${activeTab === 'editor' ? 'text-lime-400' : 'text-white/30'}`}><ICONS.Sparkles width={20}/><span className="text-[9px] uppercase font-bold tracking-widest">{t.create}</span></button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-lime-400' : 'text-white/30'}`}><ICONS.History width={20}/><span className="text-[9px] uppercase font-bold tracking-widest">{t.history}</span></button>
      </nav>
    </div>
  );
};

export default App;
