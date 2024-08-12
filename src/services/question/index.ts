// services/questionService.ts

import questionModel from "../../models/Question.model";
import { AppError } from "../../utils/AppError";
import { IQuestion } from "./type";

export const createQuestionService = async (questionData: IQuestion) => {
  try {
    const newQuestion = await questionModel.create(questionData);
    return await newQuestion.save();
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, true);
  }
};

export const getAllQuestionsService = async () => {
  try {
    return await questionModel.find().populate("evaluation");
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, true);
  }
};

export const updateQuestionService = async (
  id: string,
  questionData: Partial<IQuestion>
) => {
  try {
    const updatedQuestion = await questionModel.findByIdAndUpdate(
      id,
      questionData,
      {
        new: true,
      }
    );
    if (!updatedQuestion) {
      throw new AppError("Question not found", 404);
    }
    return updatedQuestion;
  } catch (error) {
    // validate if the question already exists
    if (error instanceof AppError) {
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new AppError("An unexpected error occurred", 500, true);
    }
  }
};
