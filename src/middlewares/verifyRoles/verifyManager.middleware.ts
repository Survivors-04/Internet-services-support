import { Request, Response, NextFunction } from "express";

export const verifyManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === 4) {
    return next();
  }

  return res.status(403).json({
    message: "access only managers",
  });
};
