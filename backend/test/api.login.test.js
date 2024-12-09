const assert = require("assert");
const axios = require("axios");
const URL = process.env.API_URL || "http://localhost:3002";

describe("POST /login API Tests", () => {
  it("should log in an existing user and return a token", async () => {
    const email = "emily.davis@email.com";
    const password = "emily456";

    const result = await axios.post(`${URL}/login`, { email, password });

    assert.equal(result.status, 200, "Expected status 200");
    assert.ok(result.data.access_token, "Token is missing in the response");
  });

  it("should return 401 for a non-existing user", async () => {
    const email = "non.existent@example.com";
    const password = "InvalidPass";

    try {
      await axios.post(`${URL}/login`, { email, password });
      assert.fail("Expected a 401 error but succeeded");
    } catch (error) {
      assert.equal(error.response.status, 401, "Expected status 401");
      assert.equal(
        error.response.data.message,
        "Invalid email or password",
        "Unexpected error message"
      );
    }
  });

  it("should return 401 for an incorrect password", async () => {
    const email = "emily.davis@email.com";
    const password = "WrongPassword";

    try {
      await axios.post(`${URL}/login`, { email, password });
      assert.fail("Expected a 401 error but succeeded");
    } catch (error) {
      assert.equal(error.response.status, 401, "Expected status 401");
      assert.equal(
        error.response.data.message,
        "Invalid email or password",
        "Unexpected error message"
      );
    }
  });

  it("should validate token and fetch user vacations", async () => {
    const email = "emily.davis@email.com";
    const password = "emily456";

    const login = await axios.post(`${URL}/login`, { email, password });

    const result = await axios.get(`${URL}/vacations`, {
      headers: { Authorization: `Bearer ${login.data.access_token}` },
    });

    assert.equal(result.status, 200, "Expected status 200");
    assert.ok(result.data.vacations, "Vacations data is missing");
    assert.equal(
      Array.isArray(result.data.vacations),
      true,
      "Vacations should be an array"
    );
    assert.notEqual(
      result.data.vacations.length,
      0,
      "Vacations array should not be empty"
    );
  });

  it("should return 400 for missing email or password", async () => {
    try {
      await axios.post(`${URL}/login`, { email: "michael.smith@example.com" });
      assert.fail("Expected a 400 error but succeeded");
    } catch (error) {
      assert.equal(error.response.status, 400, "Expected status 400");
    }
  });
});
