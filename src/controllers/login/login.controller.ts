import { loginService } from "../../services/login/login.service";
import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await loginService({ email, password });

    return res.status(200).json({ token: token });
  } catch (error) {
    if (error instanceof AppError) {
    }
  }
};
