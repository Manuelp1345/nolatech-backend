import AnswerModel from "../../models/Answer.model";
import DepartmentModel from "../../models/Department.model";
import EmployeeModel from "../../models/Employee.model";
import EvaluationModel from "../../models/Evaluation.model";
import { AppError } from "../../utils/AppError";

export const getEmployeeReportService = async (id: string) => {
  try {
    const employee = await EmployeeModel.findById(id)
      .populate("department", "name description")
      .select("firstName lastName email department");

    if (!employee) {
      throw new AppError("Empleado no encontrado", 404, true);
    }

    const evaluations = await EvaluationModel.find({ employer: id })
      .populate({ path: "department", select: "name" })
      .select("period status type");

    const answers = await AnswerModel.find({ evaluatedEmployee: id })
      .populate("question evaluator", "text firstName lastName")
      .select("answerText rating");

    const report = {
      employee,
      evaluations,
      answers,
    };

    return report;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError(
      "getEmployeeReport: An unexpected error occurred",
      500,
      false
    );
  }
};

export const getDepartmentReportService = async (id: string) => {
  try {
    const department = await DepartmentModel.findById(id).select(
      "name description"
    );
    if (!department) {
      throw new AppError("Departamento no encontrado", 404, true);
    }

    const evaluations = await EvaluationModel.find({ department: id })
      .populate("employer", "firstName lastName position")
      .select("period status type");

    const report = {
      department,
      evaluations,
    };

    return report;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError(
      "getDepartmentReport: An unexpected error occurred",
      500,
      false
    );
  }
};
