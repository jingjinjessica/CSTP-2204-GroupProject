const User = require("../model/User");
const mongoose = require("mongoose");
const { registerUser, getUser } = require("./user");

beforeAll(() => {
  const url = "mongodb://localhost:27017";
  mongoose.connect(url);
});

describe("Test Register function with API", () => {
  it("create a new user and return code 201", async () => {
    const request = {
      body: {
        email: "test@gmail.com",
        password: "test123",
        userType: "sitter",
      },
    };

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await registerUser(request, response);
    expect(response.toHaveBeenCalledWith(201));
    expect(response.json).toHaveBeenCalledWith({
      message: "Succesfully Registered User",
    });
  }, 30000);
});
