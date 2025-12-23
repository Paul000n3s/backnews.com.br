test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  realUpdatedAt = responseBody.update_at;
  parsedUpdatedAt = new Date(responseBody.update_at).toISOString();

  expect(response.status).toBe(200);
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);

  expect(realUpdatedAt).toEqual(parsedUpdatedAt);
});

test("Test de SQL Injection", async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(10); --"
  );
  const responseBody = await response.json();
});
