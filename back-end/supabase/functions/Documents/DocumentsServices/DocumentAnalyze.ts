import {getSystemPrompt, GroqRequest} from "../../_shared/utils/Groq.ts"
import { pdfToTextParser, docxToTextParser } from "../../_shared/utils/File.ts";
import { AnalysisType } from "../../_shared/prompts.ts";


export async function DocumentAnalyze(file : Blob, systemPrompt : AnalysisType, userPrompt? : string){
    
    const generateReport = (systemPrompt == AnalysisType.REPORT ? true : false)

    if(!(systemPrompt == AnalysisType.CUSTOM))
      userPrompt = ""


    let documentText = "";

    if(file instanceof Blob){
        
    if(file.type === "application/pdf")
       documentText = await pdfToTextParser(file);
    
  
    if(file.type.startsWith("text/plain") || file.type.startsWith("application/xml") )
      documentText = await file.text();
    

    if(file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      documentText = await docxToTextParser(file);
    
    }

    const selectedSystemPrompt = getSystemPrompt(systemPrompt);



    const result = await GroqRequest(selectedSystemPrompt, documentText, generateReport, userPrompt)
    
    return result;

}