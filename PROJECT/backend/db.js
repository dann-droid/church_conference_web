import { createPool } from "mysql2";

// Create a connection pool
const pool = createPool({
    host: "localhost", // Replace with your database host
    user: "root",      // Replace with your MySQL username
    password: "danson@112", // Replace with your MySQL password
    database: "bdc_2025", // Your database name
});

// Export a promise-based query function
const db = pool.promise();
export default db;
