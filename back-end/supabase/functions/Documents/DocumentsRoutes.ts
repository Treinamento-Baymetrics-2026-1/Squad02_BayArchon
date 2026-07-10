import { Hono } from "hono";
import {UploadFile} from "./DocumentsController.ts";

const authRoutes = new Hono();


authRoutes.post("/upload-file", UploadFile)




export default authRoutes;