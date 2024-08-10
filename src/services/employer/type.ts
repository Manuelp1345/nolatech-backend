export interface Employer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: Date;
  supervisor: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
