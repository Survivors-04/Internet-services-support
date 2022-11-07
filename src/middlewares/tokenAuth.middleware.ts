import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { decode } from "punycode";

const tokenAuthMiddleware = (
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

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }

      req.user = {

        id: decoded.id,
        role: decoded.role,
        is_active: decoded.is_active,
      };
      console.log(req.user + "auth token")
      return next();
    }
  );
};

export default tokenAuthMiddleware;
