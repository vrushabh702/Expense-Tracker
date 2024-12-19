const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
const port = 3001

// Middleware
app.use(cors())
app.use(express.json()) // To parse JSON data in request bodies

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
  if (err) throw err
  console.log("Connected to the database!")
  connection.release() // Release connection back to the pool
})

// ==============================
// API routes for CRUD operations
// ==============================

// ------------------------- USERS -------------------------
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving users." })
    }
    res.json(results)
  })
})

app.post("/api/users", (req, res) => {
  const { userId, userName, userEmail, userCountry, currencyId, language } =
    req.body
  db.query(
    "INSERT INTO users (userId, userName, userEmail, userCountry, currencyId, language) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, userName, userEmail, userCountry, currencyId, language],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error creating user." })
      }
      res.status(201).json({
        message: "User created successfully.",
        userId: results.insertId,
      })
    }
  )
})

app.put("/api/users/:userId", (req, res) => {
  const { userId } = req.params
  const { userName, userEmail, userCountry, currencyId, language } = req.body
  db.query(
    "UPDATE users SET userName = ?, userEmail = ?, userCountry = ?, currencyId = ?, language = ? WHERE userId = ?",
    [userName, userEmail, userCountry, currencyId, language, userId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error updating user." })
      }
      res.json({ message: "User updated successfully." })
    }
  )
})

app.delete("/api/users/:userId", (req, res) => {
  const { userId } = req.params
  db.query("DELETE FROM users WHERE userId = ?", [userId], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error deleting user." })
    }
    res.json({ message: "User deleted successfully." })
  })
})

// ------------------------- BUDGETS -------------------------
app.get("/api/budgets", (req, res) => {
  db.query("SELECT * FROM budgets", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving budgets." })
    }
    res.json(results)
  })
})

app.post("/api/budgets", (req, res) => {
  const { budgetId, userId, month } = req.body
  db.query(
    "INSERT INTO budgets (budgetId, userId, month) VALUES (?, ?, ?)",
    [budgetId, userId, month],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error creating budget." })
      }
      res.status(201).json({
        message: "Budget created successfully.",
        budgetId: results.insertId,
      })
    }
  )
})

app.put("/api/budgets/:budgetId", (req, res) => {
  const { budgetId } = req.params
  const { userId, month } = req.body
  db.query(
    "UPDATE budgets SET userId = ?, month = ? WHERE budgetId = ?",
    [userId, month, budgetId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error updating budget." })
      }
      res.json({ message: "Budget updated successfully." })
    }
  )
})

app.delete("/api/budgets/:budgetId", (req, res) => {
  const { budgetId } = req.params
  db.query(
    "DELETE FROM budgets WHERE budgetId = ?",
    [budgetId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error deleting budget." })
      }
      res.json({ message: "Budget deleted successfully." })
    }
  )
})

// ------------------------- BUDGET CATEGORIES -------------------------
app.get("/api/budgetCategories", (req, res) => {
  db.query("SELECT * FROM budget_categories", (err, results) => {
    if (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Error retrieving budget categories." })
    }
    res.json(results)
  })
})

app.post("/api/budgetCategories", (req, res) => {
  const { budgetId, categoryId, amount } = req.body
  db.query(
    "INSERT INTO budget_categories (budgetId, categoryId, amount) VALUES (?, ?, ?)",
    [budgetId, categoryId, amount],
    (err, results) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ message: "Error creating budget category." })
      }
      res.status(201).json({ message: "Budget category created successfully." })
    }
  )
})

app.put("/api/budgetCategories/:budgetId/:categoryId", (req, res) => {
  const { budgetId, categoryId } = req.params
  const { amount } = req.body
  db.query(
    "UPDATE budget_categories SET amount = ? WHERE budgetId = ? AND categoryId = ?",
    [amount, budgetId, categoryId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ message: "Error updating budget category." })
      }
      res.json({ message: "Budget category updated successfully." })
    }
  )
})

app.delete("/api/budgetCategories/:budgetId/:categoryId", (req, res) => {
  const { budgetId, categoryId } = req.params
  db.query(
    "DELETE FROM budget_categories WHERE budgetId = ? AND categoryId = ?",
    [budgetId, categoryId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ message: "Error deleting budget category." })
      }
      res.json({ message: "Budget category deleted successfully." })
    }
  )
})

// ------------------------- CATEGORIES -------------------------
app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving categories." })
    }
    res.json(results)
  })
})

app.post("/api/categories", (req, res) => {
  const { categoryId, categoryName } = req.body
  db.query(
    "INSERT INTO categories (categoryId, categoryName) VALUES (?, ?)",
    [categoryId, categoryName],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error creating category." })
      }
      res.status(201).json({ message: "Category created successfully." })
    }
  )
})

app.put("/api/categories/:categoryId", (req, res) => {
  const { categoryId } = req.params
  const { categoryName } = req.body
  db.query(
    "UPDATE categories SET categoryName = ? WHERE categoryId = ?",
    [categoryName, categoryId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error updating category." })
      }
      res.json({ message: "Category updated successfully." })
    }
  )
})

app.delete("/api/categories/:categoryId", (req, res) => {
  const { categoryId } = req.params
  db.query(
    "DELETE FROM categories WHERE categoryId = ?",
    [categoryId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error deleting category." })
      }
      res.json({ message: "Category deleted successfully." })
    }
  )
})

// ------------------------- EXPENSES -------------------------

// Get all expenses
app.get("/api/expenses", (req, res) => {
  db.query("SELECT * FROM expenses", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving expenses." })
    }
    res.json(results)
  })
})

// ------------------------- CURRENCIES -------------------------

// Get all currencies
app.get("/api/currencies", (req, res) => {
  db.query("SELECT * FROM currencies", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving currencies." })
    }
    res.json(results)
  })
})

// Create a new currency
app.post("/api/currencies", (req, res) => {
  const { currencyCode } = req.body
  db.query(
    "INSERT INTO currencies (currencyCode) VALUES (?)",
    [currencyCode],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error creating currency." })
      }
      res.status(201).json({
        message: "Currency created successfully.",
        currencyId: results.insertId,
      })
    }
  )
})

// Update an existing currency by currencyId
app.put("/api/currencies/:currencyId", (req, res) => {
  const { currencyId } = req.params
  const { currencyCode } = req.body
  db.query(
    "UPDATE currencies SET currencyCode = ? WHERE currencyId = ?",
    [currencyCode, currencyId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error updating currency." })
      }
      res.json({ message: "Currency updated successfully." })
    }
  )
})

// Delete a currency by currencyId
app.delete("/api/currencies/:currencyId", (req, res) => {
  const { currencyId } = req.params
  db.query(
    "DELETE FROM currencies WHERE currencyId = ?",
    [currencyId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error deleting currency." })
      }
      res.json({ message: "Currency deleted successfully." })
    }
  )
})

// ------------------------- PAYMENT METHODS -------------------------

// Get all payment methods
app.get("/api/payment-methods", (req, res) => {
  db.query("SELECT * FROM payment_methods", (err, results) => {
    if (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Error retrieving payment methods." })
    }
    res.json(results)
  })
})

// Create a new payment method
app.post("/api/payment-methods", (req, res) => {
  const { paymentMethodName } = req.body
  db.query(
    "INSERT INTO payment_methods (paymentMethodName) VALUES (?)",
    [paymentMethodName],
    (err, results) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ message: "Error creating payment method." })
      }
      res.status(201).json({
        message: "Payment method created successfully.",
        paymentMethodId: results.insertId,
      })
    }
  )
})

// Update an existing payment method by paymentMethodId
app.put("/api/payment-methods/:paymentMethodId", (req, res) => {
  const { paymentMethodId } = req.params
  const { paymentMethodName } = req.body
  db.query(
    "UPDATE payment_methods SET paymentMethodName = ? WHERE paymentMethodId = ?",
    [paymentMethodName, paymentMethodId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ message: "Error updating payment method." })
      }
      res.json({ message: "Payment method updated successfully." })
    }
  )
})

// Delete a payment method by paymentMethodId
app.delete("/api/payment-methods/:paymentMethodId", (req, res) => {
  const { paymentMethodId } = req.params
  db.query(
    "DELETE FROM payment_methods WHERE paymentMethodId = ?",
    [paymentMethodId],
    (err, results) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ message: "Error deleting payment method." })
      }
      res.json({ message: "Payment method deleted successfully." })
    }
  )
})

// Start the backend server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`)
})

// here is new code

// const express = require("express")
// const cors = require("cors")
// const db = require("./database.js")
// const userRoutes = require("./routes/users")
// const budgetRoutes = require("./routes/budgets.js")
// const categoryRoutes = require("./routes/categories.js")
// const currencyRoutes = require("./routes/currencies.js")
// const paymentMethodRoutes = require("./routes/paymentMethods.js")
// // const expenseRoutes = require("./routes/expenses")

// const app = express()
// const port = 3001

// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from the front-end running on localhost:3000
//     methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
//   })
// )
// app.use(express.json()) // To parse JSON data in request bodies

// app.use("/api/users", userRoutes)
// app.use("/api/budgets", budgetRoutes)
// app.use("/api/categories", categoryRoutes)
// app.use("/api/currencies", currencyRoutes)
// app.use("/api/payment-methods", paymentMethodRoutes)
// // app.use("/api/expenses", expenseRoutes)

// // ------------------------- EXPENSES -------------------------

// // Get all expenses
// app.get("/api/expenses", (req, res) => {
//   db.query("SELECT * FROM expenses", (err, results) => {
//     if (err) {
//       console.error(err)
//       return res.status(500).json({ message: "Error retrieving expenses." })
//     }
//     res.json(results)
//   })
// })

// // Start the backend server
// app.listen(port, () => {
//   console.log(`Backend server is running on http://localhost:${port}`)
// })
