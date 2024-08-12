export interface IEvaluation {
  period: string;
  status: "pending" | "completed" | "in progress";
  type: string;
  department: string;
  employer: string;
  createdAt?: Date;
  updatedAt?: Date;
}
