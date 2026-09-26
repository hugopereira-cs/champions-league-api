import createApp from "./app";
import pool from "./database/connection";

const app = createApp();
const port = process.env.PORT;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    app.listen(port, () => {
      console.log(`🔥 Server running at port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error);
    process.exit(1);
  }
};

startServer();
