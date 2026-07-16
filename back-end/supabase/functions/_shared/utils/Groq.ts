import { text } from "node:stream/consumers";
import {AnalysisType, customPromptRules, JSONPrompt, loteReportPromptRules, reportPromptRules} from "../prompts.ts"

export async function GroqRequest(
  SystemPrompt: string,
  textDocument: string,
  UserPrompt? : string,
) {

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: SystemPrompt
          },
          {
            role: "user",
            content: `${UserPrompt ? `${UserPrompt}\n\n` : ""}${textDocument}`
          }
        ]
      })
    }
  );

  const data = await response.json();

  return data.choices[0].message.content;
}



export function getSystemPrompt (type : AnalysisType): string{
  switch (type){
    case AnalysisType.REPORT:
      return reportPromptRules;
     
    case AnalysisType.CUSTOM:
      return customPromptRules;

    case AnalysisType.LOTE_REPORT:
      return loteReportPromptRules;
  }
}