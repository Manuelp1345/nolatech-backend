import DepartmentModel from "../../models/Department.model";
import employeeModel from "../../models/Employee.model";
import { AppError } from "../../utils/AppError";
import { Employer } from "./type";

export const employerService = async () => {
  try {
    const employers = await employeeModel.find();
    return employers;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, true);
  }
};

export const employerByIdService = async (id: string) => {
  try {
    const employer = await employeeModel.findById(id);
    return employer;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, true);
  }
};

export const employerCreateService = async (data: Employer) => {
  try {
    const departmentDoc = await DepartmentModel.findById(data.department);
    if (!departmentDoc) {
      throw new AppError(`Department "${data.department}" not found`, 404);
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new AppError("An unexpected error occurred", 500, true);
    }
  }

  //validate email
  try {
    const existingEmployer = await employeeModel.findOne({ email: data.email });
    if (existingEmployer) {
      throw new AppError(`Employer ${data.email} already exists`, 400);
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new AppError("An unexpected error occurred", 500, true);
    }
  }

  try {
    const newEmployer = new employeeModel(data);

    await newEmployer.save();

    return newEmployer;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, true);
  }
};

export const employerUpdateService = async (id: string, data: Employer) => {
  try {
    const employer = await employeeModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return employer;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, true);
  }
};
