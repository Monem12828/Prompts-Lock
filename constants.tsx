
import React from 'react';
import { Language } from './types';

export const COLORS = {
  accent: '#A3E635', // lime-400
  bg: '#000000',
  card: 'rgba(255, 255, 255, 0.03)',
  border: 'rgba(255, 255, 255, 0.08)',
};

export const MAX_CHARS = 1000;

export const ICONS = {
  Trash: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  Download: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  ),
  Star: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Sparkles: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  Lock: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  History: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Globe: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  Brain: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.5 2A5 5 0 0 1 12 4a5 5 0 0 1 2.5-2 5 5 0 0 1 9.5 5 5 5 0 0 1-2 3.9V12a10 10 0 0 1-20 0V10.9A5 5 0 0 1 0 7a5 5 0 0 1 9.5-5Z"/><path d="M12 4v10"/><path d="M12 18h.01"/></svg>
  )
};

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  zh: "中文"
};

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    appTitle: "PROMPT LOCK",
    subtitle: "Elite Architect v2.5",
    labTitle: "The Lab",
    labDesc: "Inject your idea. We'll architect the reality.",
    placeholder: "Paste your vision here (max 1,000 chars for elite precision)...",
    errorEmpty: "Please enter a vision to architect.",
    errorTooLong: "Maximum 1,000 characters allowed for elite focused architecture.",
    draftSaved: "Draft Saved",
    archOutput: "Architectural Output",
    download: "DOWNLOAD .TXT",
    insightsTitle: "Architect's Insights",
    insightsEmpty: "Paste a vision (up to 1,000 chars) to begin the architectural analysis.",
    loadingActive: "High-Speed Engine Active",
    kept: "Kept",
    refined: "Refined",
    added: "Added",
    locked: "Unchanged (Locked)",
    clarifications: "Clarifications Needed",
    assumptions: "Architect Assumptions",
    techSummaryTitle: "Technical Summary",
    techSummaryDesc: "\"This architecture ensures zero-loss of your original intent while dynamically injecting standard industry-grade requirements for safety and scale.\"",
    genArtifact: "Generate Artifact",
    architecting: "Architecting...",
    vault: "The Vault",
    recentGens: "Recent Generations",
    noArtifacts: "No artifacts yet.",
    upgradePro: "Upgrade to Pro",
    skip: "Skip",
    next: "Next",
    enterLab: "Enter the Lab",
    create: "Create",
    history: "Vault",
    aiDetected: "AI DETECTED",
    modes: {
      auto: { label: "AUTO-DETECT", desc: "Smart Analysis" },
      generate: { label: "GENERATE", desc: "New Concept" },
      fix: { label: "FIX / IMPROVE", desc: "Optimize Existing" },
      research: { label: "RESEARCH-FIRST", desc: "Deep Analysis" }
    },
    loadingMsgs: [
      "Analyzing structural integrity...",
      "Locking core requirements...",
      "Injecting technical constraints...",
      "Drafting architectural blueprint...",
      "Finalizing edge-case coverage...",
      "Optimizing for elite performance..."
    ],
    tutorial: [
      { title: "Welcome to the Lab", desc: "PromptLock is an elite architecture suite for your AI prompts. We don't just 'optimize'—we architect professional, production-ready specifications." },
      { title: "Smart Auto-Detect", desc: "Leave it on 'AUTO-DETECT' and our engine will automatically figure out if you're building a new idea, fixing a prompt, or doing deep research." },
      { title: "The 'Lock' Philosophy", desc: "Our AI identifies high-quality parts of your input and 'locks' them. These are never rewritten, ensuring your core vision remains untouched while we build around it." },
      { title: "Insights & Transparency", desc: "Every artifact comes with deep insights: see exactly what was added, what assumptions were made, and what questions still remain." },
      { title: "The Vault", desc: "Every generation is automatically saved to your local vault. Download them as professional TXT artifacts or favorite them for quick access." }
    ]
  },
  es: {
    appTitle: "PROMPT LOCK",
    subtitle: "Arquitecto Élite v2.5",
    labTitle: "El Laboratorio",
    labDesc: "Inyecta tu idea. Arquitectaremos la realidad.",
    placeholder: "Pega tu visión aquí (máx. 1.000 caracteres para precisión de élite)...",
    errorEmpty: "Por favor, introduce una visión para arquitectar.",
    errorTooLong: "Máximo 1.000 caracteres permitidos para una arquitectura enfocada de élite.",
    draftSaved: "Borrador Guardado",
    archOutput: "Resultado Arquitectónico",
    download: "DESCARGAR .TXT",
    insightsTitle: "Perspectivas del Arquitecto",
    insightsEmpty: "Pega una visión (hasta 1.000 caracteres) para comenzar el análisis arquitectónico.",
    loadingActive: "Motor de Alta Velocidad Activo",
    kept: "Mantenido",
    refined: "Refinado",
    added: "Añadido",
    locked: "Sin cambios (Bloqueado)",
    clarifications: "Clarificaciones Necesarias",
    assumptions: "Suposiciones del Arquitecto",
    techSummaryTitle: "Resumen Técnico",
    techSummaryDesc: "\"Esta arquitectura garantiza la pérdida cero de su intención original mientras inyecta dinámicamente requisitos estándar de grado industrial para seguridad y escala.\"",
    genArtifact: "Generar Artefacto",
    architecting: "Arquitectando...",
    vault: "La Bóveda",
    recentGens: "Generaciones Recientes",
    noArtifacts: "Aún no hay artefactos.",
    upgradePro: "Mejorar a Pro",
    skip: "Saltar",
    next: "Siguiente",
    enterLab: "Entrar al Laboratorio",
    create: "Crear",
    history: "Bóveda",
    aiDetected: "IA DETECTADA",
    modes: {
      auto: { label: "AUTO-DETECTAR", desc: "Análisis Inteligente" },
      generate: { label: "GENERAR", desc: "Nuevo Concepto" },
      fix: { label: "CORREGIR", desc: "Optimizar Existente" },
      research: { label: "INVESTIGAR", desc: "Análisis Profundo" }
    },
    loadingMsgs: [
      "Analizando integridad estructural...",
      "Bloqueando requisitos principales...",
      "Inyectando restricciones técnicas...",
      "Redactando plano arquitectónico...",
      "Finalizando cobertura de casos límite...",
      "Optimizando para rendimiento de élite..."
    ],
    tutorial: [
      { title: "Bienvenido al Laboratorio", desc: "PromptLock es una suite de arquitectura de élite para tus prompts de IA. No solo 'optimizamos', arquitectamos especificaciones profesionales listas para producción." },
      { title: "Auto-Detección Inteligente", desc: "Déjalo en 'AUTO-DETECTAR' y nuestro motor descubrirá automáticamente si estás construyendo una idea nueva, corrigiendo un prompt o investigando." },
      { title: "La Filosofía 'Lock'", desc: "Nuestra IA identifica partes de alta calidad y las 'bloquea'. Nunca se reescriben, asegurando que tu visión central permanezca intacta." },
      { title: "Perspectivas y Transparencia", desc: "Cada artefacto viene con ideas profundas: mira exactamente qué se añadió, qué suposiciones se hicieron y qué preguntas quedan." },
      { title: "La Bóveda", desc: "Cada generación se guarda automáticamente. Descárgalos como artefactos TXT profesionales o márcalos como favoritos." }
    ]
  },
  fr: {
    appTitle: "PROMPT LOCK",
    subtitle: "Architecte d'Élite v2.5",
    labTitle: "Le Labo",
    labDesc: "Injectez votre idée. Nous architecturons la réalité.",
    placeholder: "Collez votre vision ici (max 1 000 chars pour une précision d'élite)...",
    errorEmpty: "Veuillez entrer une vision à architecturer.",
    errorTooLong: "Maximum 1 000 caractères autorisés pour une architecture ciblée d'élite.",
    draftSaved: "Brouillon Enregistré",
    archOutput: "Résultat Architectural",
    download: "TÉLÉCHARGER .TXT",
    insightsTitle: "Analyses de l'Architecte",
    insightsEmpty: "Collez une vision (jusqu'à 1 000 chars) pour commencer l'analyse.",
    loadingActive: "Moteur Haute Vitesse Actif",
    kept: "Gardé",
    refined: "Affiné",
    added: "Ajouté",
    locked: "Inchangé (Verrouillé)",
    clarifications: "Clarifications Requises",
    assumptions: "Hypothèses de l'Architecte",
    techSummaryTitle: "Résumé Technique",
    techSummaryDesc: "\"Cette architecture garantit une perte nulle de votre intention originale tout en injectant dynamiquement des exigences de niveau industriel.\"",
    genArtifact: "Générer l'Artefact",
    architecting: "Architecture en cours...",
    vault: "Le Coffre",
    recentGens: "Générations Récentes",
    noArtifacts: "Aucun artefact pour le moment.",
    upgradePro: "Passer en Pro",
    skip: "Passer",
    next: "Suivant",
    enterLab: "Entrer au Labo",
    create: "Créer",
    history: "Coffre",
    aiDetected: "IA DÉTECTÉE",
    modes: {
      auto: { label: "AUTO-DÉTECTION", desc: "Analyse Intelligente" },
      generate: { label: "GÉNÉRER", desc: "Nouveau Concept" },
      fix: { label: "CORRIGER", desc: "Optimiser l'Existant" },
      research: { label: "RECHERCHE", desc: "Analyse Approfondie" }
    },
    loadingMsgs: [
      "Analyse de l'intégrité structurelle...",
      "Verrouillage des exigences clés...",
      "Injection des contraintes techniques...",
      "Rédaction du plan architectural...",
      "Finalisation des cas limites...",
      "Optimisation des performances..."
    ],
    tutorial: [
      { title: "Bienvenue au Labo", desc: "PromptLock est une suite d'architecture d'élite pour vos prompts. Nous créons des spécifications professionnelles prêtes pour la production." },
      { title: "Auto-Détection", desc: "Laissez sur 'AUTO-DÉTECTION' et notre moteur déterminera si vous créez, corrigez ou recherchez." },
      { title: "La Philosophie 'Lock'", desc: "Notre IA identifie les parties de haute qualité et les verrouille. Votre vision reste intacte pendant que nous construisons autour." },
      { title: "Transparence", desc: "Découvrez exactement ce qui a été ajouté, les hypothèses formulées et les questions restantes." },
      { title: "Le Coffre", desc: "Chaque génération est sauvegardée. Téléchargez-les en format TXT ou ajoutez-les à vos favoris." }
    ]
  },
  de: {
    appTitle: "PROMPT LOCK",
    subtitle: "Elite Architekt v2.5",
    labTitle: "Das Labor",
    labDesc: "Geben Sie Ihre Idee ein. Wir entwerfen die Realität.",
    placeholder: "Fügen Sie Ihre Vision hier ein (max. 1.000 Zeichen für Präzision)...",
    errorEmpty: "Bitte geben Sie eine Vision ein.",
    errorTooLong: "Maximal 1.000 Zeichen erlaubt.",
    draftSaved: "Entwurf gespeichert",
    archOutput: "Architektur-Ergebnis",
    download: "DOWNLOAD .TXT",
    insightsTitle: "Einblicke des Architekten",
    insightsEmpty: "Fügen Sie eine Vision ein, um die Analyse zu starten.",
    loadingActive: "Hochgeschwindigkeits-Engine aktiv",
    kept: "Behalten",
    refined: "Verfeinert",
    added: "Hinzugefügt",
    locked: "Unverändert (Gesperrt)",
    clarifications: "Klärungen erforderlich",
    assumptions: "Annahmen des Architekten",
    techSummaryTitle: "Technische Zusammenfassung",
    techSummaryDesc: "\"Diese Architektur stellt sicher, dass Ihre ursprüngliche Absicht erhalten bleibt, während Industriestandards hinzugefügt werden.\"",
    genArtifact: "Artefakt generieren",
    architecting: "Architektur wird erstellt...",
    vault: "Der Tresor",
    recentGens: "Letzte Generationen",
    noArtifacts: "Noch keine Artefakte.",
    upgradePro: "Upgrade auf Pro",
    skip: "Überspringen",
    next: "Weiter",
    enterLab: "Labor betreten",
    create: "Erstellen",
    history: "Tresor",
    aiDetected: "KI ERKANNT",
    modes: {
      auto: { label: "AUTO-ERKENNUNG", desc: "Intelligente Analyse" },
      generate: { label: "GENERIEREN", desc: "Neues Konzept" },
      fix: { label: "FIXEN", desc: "Bestehendes optimieren" },
      research: { label: "FORSCHUNG", desc: "Tiefe Analyse" }
    },
    loadingMsgs: [
      "Strukturelle Integrität prüfen...",
      "Kernanforderungen sichern...",
      "Technische Einschränkungen hinzufügen...",
      "Architekturplan entwerfen...",
      "Grenzfälle abdecken...",
      "Leistung optimieren..."
    ],
    tutorial: [
      { title: "Willkommen im Labor", desc: "PromptLock ist eine Elite-Architektur-Suite für KI-Prompts. Wir erstellen produktionsreife Spezifikationen." },
      { title: "Auto-Erkennung", desc: "Lassen Sie es auf 'AUTO-ERKENNUNG' und unser System erkennt, ob Sie generieren, fixen oder forschen." },
      { title: "Die 'Lock'-Philosophie", desc: "Unsere KI erkennt hochwertige Teile und sperrt sie. Ihre Kernvision bleibt unverändert." },
      { title: "Einblicke", desc: "Sehen Sie genau, was hinzugefügt wurde, welche Annahmen getroffen wurden und welche Fragen offen sind." },
      { title: "Der Tresor", desc: "Alle Generationen werden gespeichert. Laden Sie sie als TXT herunter oder speichern Sie Favoriten." }
    ]
  },
  ja: {
    appTitle: "PROMPT LOCK",
    subtitle: "エリート・アーキテクト v2.5",
    labTitle: "ラボ",
    labDesc: "アイデアを投入してください。私たちが現実を構築します。",
    placeholder: "ここにビジョンを貼り付けてください（エリートな精度のために最大1,000文字）...",
    errorEmpty: "設計するビジョンを入力してください。",
    errorTooLong: "エリートな設計のためには最大1,000文字までです。",
    draftSaved: "下書きを保存しました",
    archOutput: "アーキテクチャ出力",
    download: "ダウンロード .TXT",
    insightsTitle: "アーキテクトの洞察",
    insightsEmpty: "分析を開始するには、ビジョン（最大1,000文字）を貼り付けてください。",
    loadingActive: "高速エンジン稼働中",
    kept: "保持",
    refined: "洗練",
    added: "追加",
    locked: "変更なし（ロック済み）",
    clarifications: "必要な確認事項",
    assumptions: "アーキテクトの前提",
    techSummaryTitle: "技術サマリー",
    techSummaryDesc: "「このアーキテクチャは、元の意図を損なうことなく、安全性と拡張性のための業界標準の要件を動的に注入します。」",
    genArtifact: "アーティファクト生成",
    architecting: "設計中...",
    vault: "ボルト（保管庫）",
    recentGens: "最近の生成",
    noArtifacts: "アーティファクトはまだありません。",
    upgradePro: "Proへアップグレード",
    skip: "スキップ",
    next: "次へ",
    enterLab: "ラボに入る",
    create: "作成",
    history: "ボルト",
    aiDetected: "AIが検出",
    modes: {
      auto: { label: "自動検出", desc: "スマート分析" },
      generate: { label: "生成", desc: "新規コンセプト" },
      fix: { label: "修正/改善", desc: "既存の最適化" },
      research: { label: "リサーチ", desc: "詳細分析" }
    },
    loadingMsgs: [
      "構造的完全性を分析中...",
      "コア要件をロック中...",
      "技術的制約を注入中...",
      "設計図をドラフト中...",
      "エッジケースを網羅中...",
      "パフォーマンスを最適化中..."
    ],
    tutorial: [
      { title: "ラボへようこそ", desc: "PromptLockは、AIプロンプトのためのエリート設計スイートです。単なる最適化ではなく、プロフェッショナルな仕様を構築します。" },
      { title: "スマート自動検出", desc: "「自動検出」のままにしておけば、新規作成か修正かリサーチかをエンジンが自動的に判断します。" },
      { title: "「ロック」の哲学", desc: "AIが入力の高品質な部分を特定してロックします。これらは書き換えられず、コアなビジョンが守られます。" },
      { title: "洞察と透明性", desc: "何が追加されたか、どのような前提があるか、残された疑問は何かを正確に把握できます。" },
      { title: "ボルト", desc: "すべての生成物はボルトに保存されます。TXTとしてダウンロードしたり、お気に入りに追加したりできます。" }
    ]
  },
  zh: {
    appTitle: "PROMPT LOCK",
    subtitle: "精英架构师 v2.5",
    labTitle: "实验室",
    labDesc: "注入你的想法。我们来构建现实。",
    placeholder: "在此粘贴您的构思（最多 1,000 个字符以确保精确性）...",
    errorEmpty: "请输入构思进行架构。",
    errorTooLong: "最多允许 1,000 个字符。",
    draftSaved: "草稿已保存",
    archOutput: "架构输出",
    download: "下载 .TXT",
    insightsTitle: "架构师见解",
    insightsEmpty: "粘贴构思（最多 1,000 字）开始架构分析。",
    loadingActive: "高速引擎运行中",
    kept: "保留",
    refined: "精炼",
    added: "新增",
    locked: "未更改（已锁定）",
    clarifications: "需要澄清",
    assumptions: "架构假设",
    techSummaryTitle: "技术摘要",
    techSummaryDesc: "“此架构确保您的原始意图零损失，同时动态注入行业标准的安全性与扩展性要求。”",
    genArtifact: "生成产物",
    architecting: "架构中...",
    vault: "保险库",
    recentGens: "最近生成",
    noArtifacts: "暂无产物。",
    upgradePro: "升级至 Pro",
    skip: "跳过",
    next: "下一步",
    enterLab: "进入实验室",
    create: "创建",
    history: "保险库",
    aiDetected: "AI 智能检测",
    modes: {
      auto: { label: "智能检测", desc: "自动分析" },
      generate: { label: "生成", desc: "新概念" },
      fix: { label: "修正/改进", desc: "优化现有" },
      research: { label: "研究优先", desc: "深度分析" }
    },
    loadingMsgs: [
      "分析结构完整性...",
      "锁定核心需求...",
      "注入技术约束...",
      "起草架构蓝图...",
      "完成边缘情况覆盖...",
      "优化性能..."
    ],
    tutorial: [
      { title: "欢迎来到实验室", desc: "PromptLock 是一个精英 AI 提示词架构套件。我们不仅是“优化”，而是构建专业的生产级规范。" },
      { title: "智能自动检测", desc: "保持“智能检测”模式，我们的引擎会自动判断你是要开发新想法、修补提示词还是进行深度研究。" },
      { title: "“锁定”哲学", desc: "我们的 AI 会识别并锁定高质量输入。这些部分永远不会被改写，确保您的核心愿景保持不变。" },
      { title: "见解与透明度", desc: "每个产物都带有深度见解：查看添加了什么、做了哪些假设以及还有哪些问题。" },
      { title: "保险库", desc: "每次生成都会自动保存到本地。可以下载为 TXT 文件或收藏以供快速访问。" }
    ]
  }
};
