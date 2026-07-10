import { z } from "zod";

export const DocumentUploadSchema = z.object({
    file  : z.array(z.instanceof(File)),
    title : z.string(),
    visibility : z.enum(["private", "public"],{error: "Preencher com Private ou Public"}),
    extension : z.enum(["pdf", "docx", "txt", "xml"], {error: "Preencher com os tipos autorizados (PDF, DOCX, TXT, XML)"}),
    source : z.string(),
    created_by : z.uuid(),
    category_id : z.number(),
    responsible_id : z.number(),
    sector_id : z.number(),
    client_id : z.uuid(),
    project_id : z.number(),
    object_id : z.uuid(),
})
