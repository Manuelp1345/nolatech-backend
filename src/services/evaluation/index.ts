import evaluationModel from "../../models/Evaluation.model";
import { AppError } from "../../utils/AppError";
import { IEvaluation } from "./type";

export const createEvaluationService = async (data: IEvaluation) => {
  try {
    const evaluation = await evaluationModel.create(data);
    return evaluation;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError(
      "createEvaluation:An unexpected error occurred",
      500,
      false
    );
  }
};

export const listEvaluationsService = async () => {
  try {
    return await evaluationModel.find().populate("employer");
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError(
      "listEvaluations:An unexpected error occurred",
      500,
      false
    );
  }
};

export const getEvaluationByIdService = async (id: string) => {
  try {
    return await evaluationModel.findById(id).populate("employer");
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError(
      "getEvaluationById:An unexpected error occurred",
      500,
      false
    );
  }
};

export const updateEvaluationService = async (
  id: string,
  data: Partial<IEvaluation>
) => {
  return await evaluationModel.findByIdAndUpdate(id, data, { new: true });
};

export const submitEvaluationService = async (id: string) => {
  let evaluation;
  try {
    evaluation = await evaluationModel.findById(id);
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError(
      "submitEvaluation:An unexpected error occurred",
      500,
      false
    );
  }

  if (!evaluation) throw new AppError("Evaluation not found", 404, true);

  try {
    evaluation.status = "completed";
    return await evaluation.save();
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError(
      "submitEvaluation:An unexpected error occurred",
      500,
      false
    );
  }
};
