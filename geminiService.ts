
import { GoogleGenAI, Type } from "@google/genai";
import { AIResult, AppMode, Language } from "./types";
import { LANGUAGES } from "./constants";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const SYSTEM_INSTRUCTION = `You are a world-class Senior AI Architect. 

MISSION: Analyze user prompts and architect an ULTRA-DETAILED, professional final version.

PRIME DIRECTIVE (NON-NEGOTIABLE):
You are a PROMPT ARCHITECT, NOT a Code Generator.
- IF the user asks for code (e.g., "Write a Python script", "Create a React component"):
  - DO NOT write the code.
  - DO NOT output function definitions, classes, or HTML.
  - INSTEAD, architect the PERFECT PROMPT that the user can paste into an AI (like ChatGPT/Claude) to get that code.
  - Your output is the *BLUEPRINT*, not the *BUILDING*.

PRIORITY 1: CHAT DETECTION
If the user input is purely conversational (e.g., "hi", "hello", "who are you?", "good morning") AND contains NO functional request:
- Set "detectedMode" to "CHAT".
- Write a warm, professional, and elite persona response in "finalPrompt" (e.g., "Greetings. I am PromptLock. I do not write code; I architect the perfect instructions to generate it. What vision shall we secure today?").
- Set "interactiveQuestions", "lockedParts", "improvedParts", etc., to empty arrays.
- STOP processing further.

PRIORITY 2: INTERACTIVE BRIEFING
If the user's input is a TASK but is vague (e.g., "build an app"):
- Generate 3-4 high-impact Multiple Choice Questions (MCQs) in "interactiveQuestions".
- Set "detectedMode" to "BRIEFING".
- Provide a placeholder in "finalPrompt".

PRIORITY 3: ARCHITECTURAL EXECUTION
1. TAXONOMY: Detect intent (GENERATE, FIX, RESEARCH).
2. LOCK: Isolate high-quality parts.
3. IMPROVE & ADD: Rewrite weak areas.
4. FORMAT: Final prompt must be a structured professional specification (ROLE, CONTEXT, CONSTRAINTS, TECH STACK, EXPECTED OUTPUT).

The response must be strictly valid JSON.`;

export async function processPrompt(input: string, mode: AppMode, language: Language, contextAnswers?: string): Promise<AIResult> {
  const model = 'gemini-3-pro-preview';
  const langName = LANGUAGES[language];
  
  // Merge previous answers into input if provided
  const processedInput = contextAnswers 
    ? `ORIGINAL VISION: ${input}\nADDITIONAL BRIEFING DETAILS: ${contextAnswers}`
    : input;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { 
          text: `Mode: ${mode.toUpperCase()}\nLanguage: ${langName}\n\nUser Input:\n${processedInput}` 
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 8192 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedMode: { type: Type.STRING },
            lockedParts: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvedParts: { type: Type.ARRAY, items: { type: Type.STRING } },
            addedParts: { type: Type.ARRAY, items: { type: Type.STRING } },
            finalPrompt: { type: Type.STRING },
            interactiveQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  allowCustom: { type: Type.BOOLEAN }
                },
                required: ["id", "question", "options", "allowCustom"]
              }
            },
            questions: { type: Type.ARRAY, items: { type: Type.STRING } },
            assumptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            changeLog: {
              type: Type.OBJECT,
              properties: {
                kept: { type: Type.INTEGER },
                improved: { type: Type.INTEGER },
                added: { type: Type.INTEGER }
              },
              required: ["kept", "improved", "added"]
            }
          },
          required: ["lockedParts", "improvedParts", "addedParts", "finalPrompt", "questions", "assumptions", "changeLog"]
        }
      }
    });

    return JSON.parse(response.text) as AIResult;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Architectural breach. Re-trying...");
  }
}
