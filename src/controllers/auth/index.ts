import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { loginService, registerService } from "../../services/auth";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "manager", "employee").required(),
  });

  const data = req.body;

  const { error } = registerSchema.validate(data);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const token = await registerService(data);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const data = req.body;

  const { error } = loginSchema.validate(data);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const token = await loginService(data);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
