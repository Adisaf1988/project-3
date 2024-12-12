const assert = require("assert");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const URL = process.env.API_URL || "http://localhost:3002";

describe("Integration Tests for Authentication and User Details", () => {
  let token; 

 
  describe("POST /login", () => {
    it("Should successfully log in and return a valid token", async () => {
      const response = await axios.post(`${URL}/api/auth/login`, {
        email: "adi100@gmail.com", 
        password: "123456", 
      });

      assert.equal(response.status, 200, "Expected status 200");
      assert(response.data.access_token, "Token should be returned");

    
      token = response.data.access_token;
    });

    it("Should fail login with invalid credentials", async () => {
      try {
        await axios.post(`${URL}/api/auth/login`, {
          email: "nonexistent@example.com",
          password: "wrongpassword",
        });
      } catch (error) {
        assert.equal(error.response.status, 400, "Expected status 400");
        assert.equal(
          error.response.data.message,
          "Invalid email or password",
          "Expected invalid credentials message"
        );
      }
    });

    it("Should fail login with missing fields", async () => {
      try {
        await axios.post(`${URL}/api/auth/login`, {
          email: "",
          password: "",
        });
      } catch (error) {
        assert.equal(error.response.status, 400, "Expected status 400");
        assert(
          Array.isArray(error.response.data.errors),
          "Expected validation errors"
        );
      }
    });
  });

  describe("GET /userDetails", () => {
    it("Should return user details and followed vacations", async () => {
      const response = await axios.get(`${URL}/api/auth/userDetails`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      assert.equal(response.status, 200, "Expected status 200");
      assert(response.data.user, "User details should be returned");
      assert(
        Array.isArray(response.data.follows),
        "Follows should be returned as an array"
      );
    });

    it("Should fail if no token is provided", async () => {
      try {
        await axios.get(`${URL}/api/auth/userDetails`);
      } catch (error) {
        assert.equal(error.response.status, 401, "Expected status 401");
        assert.equal(
          error.response.data.error,
          "Unauthorized, token missing",
          "Expected missing token error"
        );
      }
    });
  });
});
