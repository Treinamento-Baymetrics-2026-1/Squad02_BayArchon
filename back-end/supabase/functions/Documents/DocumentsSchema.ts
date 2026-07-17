import { z } from "zod";
import { AnalysisType } from "../_shared/prompts.ts";


export const DocumentAnalyzeSchema = z.object({
    filePath : z.string(),
    systemPrompt : z.nativeEnum(AnalysisType),
    userPrompt : z.string().optional(),
})

export const ReportSchema = z.object({
  titulo: z.string(),
  resumo: z.string(),
  principais_pontos: z.array(z.string()),
  riscos: z.array(z.string()),
  oportunidades: z.array(z.string()),
  conclusao: z.string()
})