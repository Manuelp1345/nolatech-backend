import { NextFunction, Request, Response } from "express";
import {
  createAnswerService,
  getAllAnswersService,
  getAnswerByIdService,
  updateAnswerService,
} from "../../services/answer";
import Joi from "joi";

const AnswerSchema = Joi.object({
  text: Joi.string().required(),
  question: Joi.string().required(),
  evaluator: Joi.string().required(),
  employer: Joi.string().required(),
});

const AnswerIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const createAnswerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = AnswerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const answer = await createAnswerService(req.body);
    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
};

export const getAllAnswersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const answers = await getAllAnswersService();
    res.status(200).json(answers);
  } catch (error) {
    next(error);
  }
};

export const updateAnswerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = AnswerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { error: errorId } = AnswerIdSchema.validate(req.params);
  if (errorId) {
    return res.status(400).json({ message: errorId.message });
  }

  try {
    const answer = await updateAnswerService(req.params.id, req.body);
    res.status(200).json(answer);
  } catch (error) {
    next(error);
  }
};

export const getAnswerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = AnswerIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const answer = await getAnswerByIdService(req.params.id);
    res.status(200).json(answer);
  } catch (error) {
    next(error);
  }
};
