import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";

export const loginRoutes = Router()
loginRoutes.post("", loginController)