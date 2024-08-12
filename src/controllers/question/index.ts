import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {
  createQuestionService,
  getAllQuestionsService,
  updateQuestionService,
} from "../../services/question";
import { IQuestion } from "../../services/question/type";

const QuestionSchema = Joi.object({
  text: Joi.string().required(),
  evaluation: Joi.string().required(),
});

const IdSchema = Joi.object({
  id: Joi.string().required(),
});

export const createQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = QuestionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const evaluationData: IQuestion = req.body;
    const evaluation = await createQuestionService(evaluationData);
    res.status(201).json(evaluation);
  } catch (error) {
    next(error);
  }
};

export const getAllQuestionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const evaluations = await getAllQuestionsService();
    res.status(200).json(evaluations);
  } catch (error) {
    next(error);
  }
};

export const updateQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = QuestionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const { error: errorId } = IdSchema.validate(req.params);
  if (errorId) {
    return res.status(400).json({ message: errorId.message });
  }

  try {
    const updatedQuestion = await updateQuestionService(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};
