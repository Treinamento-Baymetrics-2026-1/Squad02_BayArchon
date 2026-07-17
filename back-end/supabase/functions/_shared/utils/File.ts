
import { resolvePDFJS } from "@resolvePdf"; 
import mammoth from "@mammoth"
import { Buffer } from "node:buffer";


export async function  pdfToTextParser(file: Blob){

    const arrayBuffer = await file.arrayBuffer();
    const pdfjs = await resolvePDFJS();

    const loadingTask = pdfjs.getDocument({ data : arrayBuffer})

    const pdf = await loadingTask.promise


    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++){
        const page = await pdf.getPage(i);

        const content = await page.getTextContent();

        const text = content.items
        .filter((item) => "str" in item)
        .map((item) => item.str)
        .join(" ");

        fullText += `\n--- PAGE ${i} ---\n` + text;
    }

    return fullText;

}

export async function docxToTextParser(file: Blob){
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
        buffer: Buffer.from(arrayBuffer)
    });

    return result.value.trim();
}