import { Role } from "../../utils/types";

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  role: Role;
}

export interface LoginData {
  email: string;
  password: string;
}
