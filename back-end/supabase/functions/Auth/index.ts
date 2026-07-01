import { Hono } from "hono";
import authRoutes from "./AuthRoutes.ts";

const app = new Hono().basePath("/Auth");

app.route("/", authRoutes);

Deno.serve(app.fetch);