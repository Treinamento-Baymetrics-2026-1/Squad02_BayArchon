import { Hono } from "hono";
import documentsRoutes from "./DocumentsRoutes.ts";

const app = new Hono().basePath("/Documents");

app.route("/", documentsRoutes);

Deno.serve(app.fetch);