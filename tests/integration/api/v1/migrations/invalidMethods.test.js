import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("Invalid method's to /api/v1/migrations should return 405", async () => {
  const invalidMethods = ["PUT", "DELETE", "PATCH"];

  for (var invalidMethod in invalidMethods) {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: invalidMethods[invalidMethod],
    });

    expect(response.status).toBe(405);
    const responseBody = await response.json();

    expect(responseBody.error).toBe(
      `Method "${invalidMethods[invalidMethod]}" not allowed`,
    );
  }
});
