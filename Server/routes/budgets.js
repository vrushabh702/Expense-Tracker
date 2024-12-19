const express = require("express")
const db = require("../database.js")
const route = express.Router()
const cors = require("cors")
app.use(cors())
// ------------------------- BUDGETS -------------------------

route.get("/api/budgets", (req, res) => {
  db.query("SELECT * FROM budgets", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving budgets." })
    }
    res.json(results)
  })
})

/*
route.get("/api/budgets", async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM budgets")
    res.json(results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error retrieving budgets." })
  }
})
  */

route.post("/api/budgets", async (req, res) => {
  const { userId, month } = req.body

  // Validate request body
  if (!userId || !month) {
    return res.status(400).json({ message: "Missing required fields." })
  }

  try {
    const [results] = await db
      .promise()
      .query("INSERT INTO budgets (userId, month) VALUES (?, ?)", [
        userId,
        month,
      ])
    res.status(201).json({
      message: "Budget created successfully.",
      budgetId: results.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error creating budget." })
  }
})

route.put("/api/budgets/:budgetId", async (req, res) => {
  const { budgetId } = req.params
  const { userId, month } = req.body

  // Validate request body
  if (!userId || !month) {
    return res.status(400).json({ message: "Missing required fields." })
  }

  try {
    const [results] = await db
      .promise()
      .query("UPDATE budgets SET userId = ?, month = ? WHERE budgetId = ?", [
        userId,
        month,
        budgetId,
      ])

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Budget not found." })
    }

    res.json({ message: "Budget updated successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error updating budget." })
  }
})

route.delete("/api/budgets/:budgetId", async (req, res) => {
  const { budgetId } = req.params

  try {
    const [results] = await db
      .promise()
      .query("DELETE FROM budgets WHERE budgetId = ?", [budgetId])

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Budget not found." })
    }

    res.json({ message: "Budget deleted successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error deleting budget." })
  }
})
