import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/appError";
export const verifyCollaboratorRoleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role > 1) {
    return next();
  }
  throw new AppError("Unauthorized", 403);
};
