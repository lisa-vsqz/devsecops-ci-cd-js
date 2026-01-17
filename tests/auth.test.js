const request = require("supertest");
const app = require("../src/app");

describe("Authentication middleware", () => {
  test("Rejects request without token", async () => {
    const response = await request(app).get("/api/users");

    expect(response.statusCode).toBe(401);
  });
});
