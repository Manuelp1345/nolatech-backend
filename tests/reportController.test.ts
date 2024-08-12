// tests/reportController.test.ts
import { Request, Response } from "express";
import {
  getEmployeeReportController,
  getDepartmentReportController,
} from "../src/controllers/report";
import {
  getEmployeeReportService,
  getDepartmentReportService,
} from "../src/services/report";

// Mock the services
jest.mock("../src/services/report");

describe("Report Controllers", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      params: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    next = jest.fn();
  });

  describe("getEmployeeReportController", () => {
    it("should return employee report successfully", async () => {
      req.params = { id: "employeeId" };

      (getEmployeeReportService as jest.Mock).mockResolvedValue({
        employee: { firstName: "John", lastName: "Doe" },
        evaluations: [
          {
            period: "Q1",
            status: "completed",
            type: "annual",
            department: { name: "Sales" },
          },
        ],
        answers: [
          {
            answerText: "Excellent work",
            rating: 5,
            question: { text: "How was the performance?" },
            evaluator: { firstName: "Jane", lastName: "Doe" },
          },
        ],
      });

      await getEmployeeReportController(req as Request, res as Response, next);

      expect(getEmployeeReportService).toHaveBeenCalledWith("employeeId");
      expect(res.json).toHaveBeenCalledWith({
        employee: { firstName: "John", lastName: "Doe" },
        evaluations: [
          {
            period: "Q1",
            status: "completed",
            type: "annual",
            department: { name: "Sales" },
          },
        ],
        answers: [
          {
            answerText: "Excellent work",
            rating: 5,
            question: { text: "How was the performance?" },
            evaluator: { firstName: "Jane", lastName: "Doe" },
          },
        ],
      });
    });

    it("should handle service errors", async () => {
      req.params = { id: "employeeId" };
      (getEmployeeReportService as jest.Mock).mockRejectedValue(
        new Error("Service Error")
      );

      await getEmployeeReportController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("getDepartmentReportController", () => {
    it("should return department report successfully", async () => {
      req.params = { id: "departmentId" };

      (getDepartmentReportService as jest.Mock).mockResolvedValue({
        department: { name: "Sales" },
        evaluations: [
          {
            period: "Q1",
            status: "completed",
            type: "annual",
            employer: { firstName: "John", lastName: "Doe" },
          },
        ],
      });

      await getDepartmentReportController(
        req as Request,
        res as Response,
        next
      );

      expect(getDepartmentReportService).toHaveBeenCalledWith("departmentId");
      expect(res.json).toHaveBeenCalledWith({
        department: { name: "Sales" },
        evaluations: [
          {
            period: "Q1",
            status: "completed",
            type: "annual",
            employer: { firstName: "John", lastName: "Doe" },
          },
        ],
      });
    });

    it("should handle service errors", async () => {
      req.params = { id: "departmentId" };
      (getDepartmentReportService as jest.Mock).mockRejectedValue(
        new Error("Service Error")
      );

      await getDepartmentReportController(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
