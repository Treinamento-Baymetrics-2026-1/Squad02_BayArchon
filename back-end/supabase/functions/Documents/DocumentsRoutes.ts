import { Hono } from "hono";
import {UploadFile, GetFile, AnalyzeDocument} from "./DocumentsController.ts";


const documentsRoutes = new Hono();


documentsRoutes.post("/upload-file", UploadFile)

documentsRoutes.post("/catch-file", GetFile)

documentsRoutes.post("/analyse", AnalyzeDocument)




export default documentsRoutes;