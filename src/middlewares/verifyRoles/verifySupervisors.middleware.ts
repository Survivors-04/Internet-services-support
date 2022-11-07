import { Request, Response, NextFunction } from "express";

export const verifySupervisorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log(req.user + "midle supervisors")
  if (req.user.role <= 2) {
    
    return res.status(403).json({
      message: "access only for supervisors and managers",
    });
  }
  return next();
};
