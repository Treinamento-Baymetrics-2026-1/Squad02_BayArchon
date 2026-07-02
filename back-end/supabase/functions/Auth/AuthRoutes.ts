import { Hono } from "hono";
import {Register, FirstAccess} from "./AuthController.ts";

const authRoutes = new Hono();


authRoutes.post("/admin/register", Register)

authRoutes.post("/user/first-access", FirstAccess)


export default authRoutes;