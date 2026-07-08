import { Hono } from "hono";
import {Register, FirstAccess, Login, SendRedefinePassword, UpdatePassword} from "./AuthController.ts";

const authRoutes = new Hono();


authRoutes.post("/admin/register", Register)

authRoutes.post("/user/first-access", FirstAccess)

authRoutes.post("/login", Login)

authRoutes.post("/send-redefine-password", SendRedefinePassword)

authRoutes.post("/update-password", UpdatePassword)




export default authRoutes;