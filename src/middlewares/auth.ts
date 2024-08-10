import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/User.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };
    req.user = decoded as typeof userModel.schema.obj;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token inválido" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      if (!roles.includes(req?.user?.role as string)) {
        return res.status(403).json({ message: "No autorizado" });
      }
    } else {
      return res.status(401).json({ message: "No autenticado" });
    }

    next();
  };
};
