import { createPool } from "mysql2";

//connection pool
const pool = createPool({
    host: "localhost", 
    user: "root",      
    password: "danson@112", 
    database: "bdc_2025", 
});

//Exporting promise-based query function
const db = pool.promise();
export default db;

