const express = require("express")
const db = require("../database.js")
const route = express.Router()
const cors = require("cors")
app.use(cors())

// ------------------------- CATEGORIES -------------------------
route.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving categories." })
    }
    res.json(results)
  })
})

// route.get("/api/categories", async (req, res) => {
//   try {
//     const [results] = await db.promise().query("SELECT * FROM categories")
//     res.json(results)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Error retrieving categories." })
//   }
// })

route.post("/api/categories", async (req, res) => {
  const { categoryId, categoryName } = req.body

  // Validate request body
  if (!categoryId || !categoryName) {
    return res.status(400).json({ message: "Missing required fields." })
  }

  try {
    const [results] = await db
      .promise()
      .query(
        "INSERT INTO categories (categoryId, categoryName) VALUES (?, ?)",
        [categoryId, categoryName]
      )
    res.status(201).json({
      message: "Category created successfully.",
      categoryId: results.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error creating category." })
  }
})

route.put("/api/categories/:categoryId", async (req, res) => {
  const { categoryId } = req.params
  const { categoryName } = req.body

  // Validate request body
  if (!categoryName) {
    return res
      .status(400)
      .json({ message: "Missing required field: categoryName." })
  }

  try {
    const [results] = await db
      .promise()
      .query("UPDATE categories SET categoryName = ? WHERE categoryId = ?", [
        categoryName,
        categoryId,
      ])

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found." })
    }

    res.json({ message: "Category updated successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error updating category." })
  }
})

route.delete("/api/categories/:categoryId", async (req, res) => {
  const { categoryId } = req.params

  try {
    const [results] = await db
      .promise()
      .query("DELETE FROM categories WHERE categoryId = ?", [categoryId])

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found." })
    }

    res.json({ message: "Category deleted successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error deleting category." })
  }
})
