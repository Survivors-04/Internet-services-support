import { Request, Response, NextFunction } from "express";

const verifyClientRoleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idParams = req.params?.id;
  if (req.user.id !== idParams && req.user.role == 1) {
    return res.status(403).json({
      message: "The client is not allowed to access this route",
    });
  }

  return next();
};

export default verifyClientRoleMiddleware;
