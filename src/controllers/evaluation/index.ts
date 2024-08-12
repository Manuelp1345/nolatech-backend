import { NextFunction, Request, Response } from "express";

import { IEvaluation } from "../../services/evaluation/type";
import {
  createEvaluationService,
  getEvaluationByIdService,
  listEvaluationsService,
  submitEvaluationService,
  updateEvaluationService,
} from "../../services/evaluation";
import Joi from "joi";

const EvaluationSchema = Joi.object({
  period: Joi.string().required(),
  status: Joi.string().required(),
  type: Joi.string().required(),
  department: Joi.string().required(),
  employer: Joi.string().required(),
});
const EvaluationIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const createEvaluationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = EvaluationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const evaluationData: IEvaluation = req.body;
    const evaluation = await createEvaluationService(evaluationData);
    res.status(201).json(evaluation);
  } catch (error) {
    next(error);
  }
};

export const listEvaluationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const evaluations = await listEvaluationsService();
    res.status(200).json(evaluations);
  } catch (error) {
    next(error);
  }
};

export const getEvaluationByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = EvaluationIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const evaluation = await getEvaluationByIdService(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ error: "Evaluación no encontrada" });
    }
    res.status(200).json(evaluation);
  } catch (error) {
    next(error);
  }
};

export const updateEvaluationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = EvaluationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { error: errorId } = EvaluationIdSchema.validate(req.params);
  if (errorId) {
    return res.status(400).json({ message: errorId.message });
  }

  try {
    const updatedEvaluation = await updateEvaluationService(
      req.params.id,
      req.body
    );
    if (!updatedEvaluation) {
      return res.status(404).json({ error: "Evaluación no encontrada" });
    }
    res.status(200).json(updatedEvaluation);
  } catch (error) {
    next(error);
  }
};

export const submitEvaluationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = EvaluationIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const submittedEvaluation = await submitEvaluationService(req.params.id);
    res.status(200).json({
      message: "Evaluación enviada correctamente",
      evaluation: submittedEvaluation,
    });
  } catch (error) {
    next(error);
  }
};
