import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseMaxConnection = parseInt(
    maxConnectionsResult.rows[0].max_connections
  );

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM  pg_stat_activity where datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnections.rows[0].count;

  response.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        max_connections: databaseMaxConnection,
        opened_connections: databaseOpenedConnectionsValue,
        version: databaseVersion,
      },
    },
  });
}

export default status;
