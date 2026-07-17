import {AnalysisType, customPromptRules, reportPromptRules} from "../prompts.ts"

export async function GroqRequest(
  SystemPrompt: string,
  textDocument: string,
  GenerateReport : Boolean,
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

  const result = data.choices[0].message.content;

  if(GenerateReport){
    try {
    return JSON.parse(result)
    } catch (_error) {
      throw new Error("Erro de processamento da IA. Solicite o relatório novamente.");
    }
  }

  return result;
}



export function getSystemPrompt (type : AnalysisType): string{
  switch (type){
    case AnalysisType.REPORT:
      return reportPromptRules;
     
    case AnalysisType.CUSTOM:
      return customPromptRules;
  }
}
