import { Request, Response, NextFunction } from "express";

const verifyClientRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === 1) {
    return res.status(403).json({
      message: "The client is not allowed to access this route",
    });
  }

  return next();
};

export default verifyClientRoleMiddleware;
