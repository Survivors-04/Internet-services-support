import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/appError";
export const verifyManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role < 4) {
    return res.status(403).json({
      message: "access only managers",
    });
  }
  next();
};
