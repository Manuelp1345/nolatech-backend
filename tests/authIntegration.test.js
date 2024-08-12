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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/authIntegration.test.ts
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = require("../src/index");
const User_model_1 = __importDefault(require("../src/models/User.model"));
// Load test environment variables
dotenv_1.default.config({ path: ".env.test" });
describe("Authentication API Integration Tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to the test database
        yield mongoose_1.default.connect(process.env.MONGO_URI);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clear the database after each test
        yield User_model_1.default.deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Close the database connection after all tests
        yield mongoose_1.default.connection.close();
    }));
    it("should register a new user and return a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).post("/auth/register").send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
            role: "employee",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("token");
    }));
    it("should not register a user with an existing email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield new User_model_1.default({
            username: "existinguser",
            email: "existinguser@example.com",
            password: "password123",
            role: "employee",
        }).save();
        const response = yield (0, supertest_1.default)(index_1.app).post("/auth/register").send({
            username: "newuser",
            email: "existinguser@example.com",
            password: "password123",
            role: "employee",
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Email already exists");
    }));
    it("should login an existing user and return a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash("password123", 12);
        yield new User_model_1.default({
            username: "loginuser",
            email: "loginuser@example.com",
            password: hashedPassword,
            role: "employee",
        }).save();
        const response = yield (0, supertest_1.default)(index_1.app).post("/auth/login").send({
            email: "loginuser@example.com",
            password: "password123",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    }));
    it("should not login with incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash("password123", 12);
        yield new User_model_1.default({
            username: "loginuser",
            email: "loginuser@example.com",
            password: hashedPassword,
            role: "employee",
        }).save();
        const response = yield (0, supertest_1.default)(index_1.app).post("/auth/login").send({
            email: "loginuser@example.com",
            password: "wrongpassword",
        });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "User or password incorrect");
    }));
});
