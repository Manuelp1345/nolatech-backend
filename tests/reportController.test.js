"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const report_1 = require("../src/controllers/report");
const report_2 = require("../src/services/report");
// Mock the services
jest.mock("../src/services/report");
describe("Report Controllers", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            params: {},
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });
    describe("getEmployeeReportController", () => {
        it("should return employee report successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: "employeeId" };
            report_2.getEmployeeReportService.mockResolvedValue({
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
            yield (0, report_1.getEmployeeReportController)(req, res, next);
            expect(report_2.getEmployeeReportService).toHaveBeenCalledWith("employeeId");
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
        }));
        it("should handle service errors", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: "employeeId" };
            report_2.getEmployeeReportService.mockRejectedValue(new Error("Service Error"));
            yield (0, report_1.getEmployeeReportController)(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
        }));
    });
    describe("getDepartmentReportController", () => {
        it("should return department report successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: "departmentId" };
            report_2.getDepartmentReportService.mockResolvedValue({
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
            yield (0, report_1.getDepartmentReportController)(req, res, next);
            expect(report_2.getDepartmentReportService).toHaveBeenCalledWith("departmentId");
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
        }));
        it("should handle service errors", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: "departmentId" };
            report_2.getDepartmentReportService.mockRejectedValue(new Error("Service Error"));
            yield (0, report_1.getDepartmentReportController)(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
        }));
    });
});
