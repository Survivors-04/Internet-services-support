import { Request, Response, NextFunction } from "express";

const verifyCollaboratorRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role < 2) {
    return res.status(403).json({
      message: "Only collaborators or superiors can access this route",
    });
  }

  return next();
};

export default verifyCollaboratorRoleMiddleware;
