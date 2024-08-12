import AnswerModel from "../../models/Answer.model";
import EmployeeModel from "../../models/Employee.model";
import QuestionModel from "../../models/Question.model";
import { IAnswer } from "./type";
import { AppError } from "../../utils/AppError";
import UserModel from "../../models/User.model";

export const createAnswerService = async (answerData: IAnswer) => {
  const {
    text,
    question: questionId,
    evaluator: evaluatorId,
    employer: evaluatedEmployeeId,
  } = answerData;

  const questionPromise = QuestionModel.findById(questionId);
  const evaluatorPromise = UserModel.findById(evaluatorId);
  const evaluatedEmployeePromise = EmployeeModel.findById(evaluatedEmployeeId);

  const [question, evaluator, evaluatedEmployee] = await Promise.all([
    questionPromise,
    evaluatorPromise,
    evaluatedEmployeePromise,
  ]);

  if (!question) {
    throw new AppError("Question not found", 404, true);
  }

  if (!evaluator) {
    throw new AppError("Evaluator not found", 404, true);
  }

  if (!evaluatedEmployee) {
    throw new AppError("Evaluated employee not found", 404, true);
  }

  try {
    const answer = await AnswerModel.create({
      text,
      question,
      evaluator,
      evaluatedEmployee,
    });

    const result = answer.toObject();

    delete result.evaluator;

    return result;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, false);
  }
};

export const getAllAnswersService = async () => {
  try {
    return await AnswerModel.find()
      .populate({
        path: "question",
        select: "-_id text", // Include only necessary fields from question
      })
      .populate({
        path: "evaluator",
        select: "_id", // Include only the _id of the evaluator
      })
      .exec();
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, false);
  }
};

export const updateAnswerService = async (id: string, updateData: IAnswer) => {
  try {
    const answer = await AnswerModel.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate({
        path: "question",
        select: "-_id text", // Include only necessary fields from question
      })
      .populate({
        path: "evaluator",
        select: "_id", // Include only the _id of the evaluator
      })
      .exec();

    return answer;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, false);
  }
};

export const getAnswerByIdService = async (id: string) => {
  try {
    const answer = await AnswerModel.findById(id)
      .populate({
        path: "question",
        select: "-_id text", // Include only necessary fields from question
      })
      .populate({
        path: "evaluator",
        select: "_id", // Include only the _id of the evaluator
      })
      .exec();

    return answer;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, false);
  }
};
