const mysql = require("mysql2")

// Database connection (using connection pooling for better performance)
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "expense_tracker",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: " + err.stack)
    return
  }
  console.log("Connected to the database!")
  connection.release() // Release connection back to the pool
})
