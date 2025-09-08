import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// fungsi ping dengan retry
export async function pingDB(retries = 10, delay = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      const conn = await db.getConnection();
      await conn.ping();
      conn.release();
      console.log("Database connection successful!");
      return;
    } catch (err) {
      console.error(`DB connection failed (attempt ${i}): ${err.message}`);
      if (i === retries) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
      console.log(`Retrying in ${delay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export default db;
