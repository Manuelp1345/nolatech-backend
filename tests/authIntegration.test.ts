// tests/authIntegration.test.ts
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { app } from "../src/index";
import userModel from "../src/models/User.model";

// Load test environment variables
dotenv.config({ path: ".env.test" });

describe("Authentication API Integration Tests", () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterEach(async () => {
    // Clear the database after each test
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  it("should register a new user and return a token", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      role: "employee",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should not register a user with an existing email", async () => {
    await new userModel({
      username: "existinguser",
      email: "existinguser@example.com",
      password: "password123",
      role: "employee",
    }).save();

    const response = await request(app).post("/auth/register").send({
      username: "newuser",
      email: "existinguser@example.com",
      password: "password123",
      role: "employee",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email already exists");
  });

  it("should login an existing user and return a token", async () => {
    const hashedPassword = await bcrypt.hash("password123", 12);

    await new userModel({
      username: "loginuser",
      email: "loginuser@example.com",
      password: hashedPassword,
      role: "employee",
    }).save();

    const response = await request(app).post("/auth/login").send({
      email: "loginuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not login with incorrect password", async () => {
    const hashedPassword = await bcrypt.hash("password123", 12);

    await new userModel({
      username: "loginuser",
      email: "loginuser@example.com",
      password: hashedPassword,
      role: "employee",
    }).save();

    const response = await request(app).post("/auth/login").send({
      email: "loginuser@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "User or password incorrect"
    );
  });
});
