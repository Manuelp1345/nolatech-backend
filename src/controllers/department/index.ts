// controllers/departmentController.js

import { NextFunction, Request, Response } from "express";
import {
  createDepartmentService,
  deleteDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
} from "../../services/department";
import Joi from "joi";

const DepartmentSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const IdSchema = Joi.object({
  id: Joi.string().required(),
});

export const createDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = DepartmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const department = await createDepartmentService(req.body);
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
};

export const getAllDepartmentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departments = await getAllDepartmentsService();
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

export const getDepartmentByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = IdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const department = await getDepartmentByIdService(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};

export const updateDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = DepartmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const { error: errorId } = IdSchema.validate(req.params);
  if (errorId) {
    return res.status(400).json({ message: errorId.message });
  }

  try {
    const department = await updateDepartmentService(req.params.id, req.body);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};

export const deleteDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = IdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const department = await deleteDepartmentService(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
