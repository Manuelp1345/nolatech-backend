import userModel from "../models/User.model";
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    export interface Request {
      user?: typeof userModel.schema.obj;
    }
  }
}
export enum Role {
  ADMIN = "admin",
  MANAGER = "manager",
  EMPLOYEE = "employee",
}
