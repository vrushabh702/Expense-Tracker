const express = require("express")
const db = require("../database.js")
const cors = require("cors")
app.use(cors())

const route = express.Router()

// ------------------------- BUDGET CATEGORIES -------------------------
route.get("/api/budgetCategories", (req, res) => {
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

// route.get("/api/budgetCategories", async (req, res) => {
//   try {
//     const [results] = await db
//       .promise()
//       .query("SELECT * FROM budget_categories")
//     res.json(results)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Error retrieving budget categories." })
//   }
// })

route.post("/api/budgetCategories", async (req, res) => {
  const { budgetId, categoryId, amount } = req.body

  // Validate request body
  if (!budgetId || !categoryId || amount === undefined) {
    return res.status(400).json({ message: "Missing required fields." })
  }

  try {
    const [results] = await db
      .promise()
      .query(
        "INSERT INTO budget_categories (budgetId, categoryId, amount) VALUES (?, ?, ?)",
        [budgetId, categoryId, amount]
      )
    res.status(201).json({
      message: "Budget category created successfully.",
      budgetCategoryId: results.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error creating budget category." })
  }
})

route.put("/api/budgetCategories/:budgetId/:categoryId", async (req, res) => {
  const { budgetId, categoryId } = req.params
  const { amount } = req.body

  // Validate request body
  if (amount === undefined) {
    return res.status(400).json({ message: "Missing required field: amount." })
  }

  try {
    const [results] = await db
      .promise()
      .query(
        "UPDATE budget_categories SET amount = ? WHERE budgetId = ? AND categoryId = ?",
        [amount, budgetId, categoryId]
      )

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Budget category not found." })
    }

    res.json({ message: "Budget category updated successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error updating budget category." })
  }
})

route.delete(
  "/api/budgetCategories/:budgetId/:categoryId",
  async (req, res) => {
    const { budgetId, categoryId } = req.params

    try {
      const [results] = await db
        .promise()
        .query(
          "DELETE FROM budget_categories WHERE budgetId = ? AND categoryId = ?",
          [budgetId, categoryId]
        )

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Budget category not found." })
      }

      res.json({ message: "Budget category deleted successfully." })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Error deleting budget category." })
    }
  }
)
