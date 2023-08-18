import { Router } from "express";
import {
  login,
  logout,
  register,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateAuthSchema.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
const authRouter = Router();

authRouter.post("/register", validateSchema(registerSchema), register);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.get("/profile", authRequired, profile);
authRouter.get("/verify", verifyToken);

export default authRouter;
