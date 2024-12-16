const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
const port = 3001 // Backend will run on this port

// Enable CORS for React frontend
app.use(cors())

// Database connection
const db = mysql.createConnection({
  host: "localhost", // MySQL host
  user: "root", // MySQL username
  password: "", // MySQL password
  database: "expense_tracker", // Your database name
})

db.connect((err) => {
  if (err) throw err
  console.log("Connected to the database!")
})

// API routes to fetch data
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

app.get("/api/budgets", (req, res) => {
  db.query("SELECT * FROM budgets", (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

app.get("/api/expenses", (req, res) => {
  db.query("SELECT * FROM expenses", (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

app.get("/api/payment-methods", (req, res) => {
  db.query("SELECT * FROM payment_methods", (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

app.get("/api/currencies", (req, res) => {
  db.query("SELECT * FROM currencies", (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

// Start the backend server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`)
})
