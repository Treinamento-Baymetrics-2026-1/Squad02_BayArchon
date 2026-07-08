import { Hono } from "hono";
import sectorsRoutes from "./SectorsRoutes.ts";

const app = new Hono().basePath("/Sectors");

app.route("/", sectorsRoutes);

Deno.serve(app.fetch);