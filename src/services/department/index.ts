import DepartmentModel from "../../models/Department.model";
import { IDepartment } from "./type.js";
import { AppError } from "../../utils/AppError";

export const createDepartmentService = async (data: IDepartment) => {
  //validate if the department already exists

  try {
    const existingDepartment = await DepartmentModel.findOne({
      name: data.name,
    });
    if (existingDepartment) {
      throw new AppError("Department already exists", 400);
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
    const department = await DepartmentModel.create(data);
    return department;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500);
  }
};

export const getAllDepartmentsService = async () => {
  try {
    return await DepartmentModel.find();
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500);
  }
};

export const getDepartmentByIdService = async (id: string) => {
  try {
    return await DepartmentModel.findById(id);
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500);
  }
};

export const updateDepartmentService = async (
  id: string,
  data: IDepartment
) => {
  try {
    return await DepartmentModel.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500);
  }
};

export const deleteDepartmentService = async (id: string) => {
  try {
    return await DepartmentModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500);
  }
};
