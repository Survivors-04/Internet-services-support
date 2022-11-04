import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      role: decoded.role,
      is_active: decoded.is_active,
    };

    return next();
  });
};

export default tokenAuthMiddleware;
