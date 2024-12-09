const assert = require("assert");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const URL = process.env.API_URL || "http://localhost:3002";

describe("POST /register", () => {
  it("Should successfully register", async () => {
    const email = `emily${Math.ceil(Math.random() * 999)}.davis@email.com`;
    const password = "emily456";

    const result = await axios.post(`${URL}/api/auth/register`, {
      email,
      password,
      firstName: "dfdsgdsg",
      lastName: "dsgdsfgsfg",
    });

    assert.equal(result.status, 201, "Expected status 200");
  });
});
