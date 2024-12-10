const assert = require("assert");
const http = require("http");

const BASE_URL = "http://localhost:3002";

describe("Integration Tests for Vacations Router", () => {
  it("GET /vacations - Should return a list of vacations", (done) => {
    http.get(`${BASE_URL}/api/vacations`, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = JSON.parse(data);
        assert.ok(response.vacations);
        assert.ok(Array.isArray(response.vacations));
        done();
      });
    });
  });

  it("POST /api/add-vacation - Should add a new vacation", (done) => {
    const newVacation = JSON.stringify({
      destination: "Paris",
      description: "Visit the Eiffel Tower",
      start_date: "2024-12-20",
      end_date: "2024-12-27",
      price: 1200,
      vacation_photo: "paris.jpg",
    });

    const options = {
      hostname: "localhost",
      port: 3002,
      path: "/api/add-vacation",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": newVacation.length,
      },
    };

    const req = http.request(options, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = JSON.parse(data);
        assert.ok(response.result);
        done();
      });
    });

    req.on("error", (e) => {
      done(e);
    });

    req.write(newVacation);
    req.end();
  });

  it("DELETE /delete-vacation/:id - Should delete a vacation by ID", (done) => {
    const vacationId = 54; // עדכן את ה-ID לפי הנתונים שלך

    const options = {
      hostname: "localhost",
      port: 3002,
      path: `/api/delete-vacation/${vacationId}`,
      method: "DELETE",
    };

    const req = http.request(options, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = JSON.parse(data);
        assert.ok(response.result);
        done();
      });
    });

    req.on("error", (e) => {
      done(e);
    });

    req.end();
  });
});
