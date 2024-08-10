import employeeModel from "../../models/Employee.model";
import { AppError } from "../../utils/AppError";
import { Employer } from "./type";

export const employerService = async () => {
  try {
    const employers = await employeeModel.find();
    return employers;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, false); // Errores desconocidos
  }
};

export const employerByIdService = async (id: string) => {
  try {
    const employer = await employeeModel.findById(id);
    return employer;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, false); // Errores desconocidos
  }
};

export const employerCreateService = async (data: Employer) => {
  try {
    const newEmployer = new employeeModel(data);

    await newEmployer.save();

    return newEmployer;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new AppError("An unexpected error occurred", 500, false); // Errores desconocidos
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
    throw new AppError("An unexpected error occurred", 500, false); // Errores desconocidos
  }
};
