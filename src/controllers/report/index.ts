import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {
  getDepartmentReportService,
  getEmployeeReportService,
} from "../../services/report";

const IdSchema = Joi.object({
  id: Joi.string().required(),
});

export const getEmployeeReportController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = IdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const evaluation = await getEmployeeReportService(req.params.id);
    res.status(201).json(evaluation);
  } catch (error) {
    next(error);
  }
};

export const getDepartmentReportController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = IdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const evaluations = await getDepartmentReportService(req.params.id);
    res.status(200).json(evaluations);
  } catch (error) {
    next(error);
  }
};
