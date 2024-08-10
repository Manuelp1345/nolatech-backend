import { NextFunction, Request, Response } from "express";
import {
  employerByIdService,
  employerCreateService,
  employerService,
  employerUpdateService,
} from "../../services/employer";
import Joi from "joi";

const EmployerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  hireDate: Joi.date().required(),
  supervisor: Joi.string().required(),
  user: Joi.string().required(),
});

export const employerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employers = await employerService();

    res.status(200).json(employers);
  } catch (error) {
    next(error);
  }
};

export const employerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const EmployerSchema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = EmployerSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { id } = req.params;

  try {
    const employer = await employerByIdService(id);

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.status(200).json(employer);
  } catch (error) {
    next(error);
  }
};

export const employerCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = EmployerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const newEmployer = await employerCreateService(req.body);

    res.status(201).json(newEmployer);
  } catch (error) {
    next(error);
  }
};

export const employerUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idSchema = Joi.object({
    id: Joi.string().required(),
  });

  const { error: idError } = idSchema.validate(req.params);

  if (idError) {
    return res.status(400).json({ message: idError.message });
  }

  const { error } = EmployerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const updatedEmployer = await employerUpdateService(
      req.params.id,
      req.body
    );

    res.status(200).json(updatedEmployer);
  } catch (error) {
    next(error);
  }
};
