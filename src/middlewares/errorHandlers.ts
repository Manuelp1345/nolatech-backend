// middleware/errorHandlers.ts
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError && !err.isOperational) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Validation Error",
      details: Object.values(err.errors).map((error) => error.message),
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: `Invalid ${err.path}: ${err.value}. Expected type: ${err.kind}.`,
    });
  }

  // Default error handling
  console.error("ERROR:", err);
  res.status(500).json({ message: "An unexpected error occurred" });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
};
