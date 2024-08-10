// middleware/errorHandlers.ts
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (err: AppError, req: Request, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error("ERROR 💥:", err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
};
