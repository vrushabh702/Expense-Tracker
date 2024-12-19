const express = require("express")
const db = require("../database.js")
const route = express.Router()
const cors = require("cors")
app.use(cors())

// ------------------------- CURRENCIES -------------------------
route.get("/api/currencies", (req, res) => {
  db.query("SELECT * FROM currencies", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving currencies." })
    }
    res.json(results)
  })
})
// // Get all currencies
// route.get("/api/currencies", async (req, res) => {
//   try {
//     const [results] = await db.promise().query("SELECT * FROM currencies")
//     res.json(results)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Error retrieving currencies." })
//   }
// })

// Create a new currency
route.post("/api/currencies", async (req, res) => {
  const { currencyCode } = req.body

  // Validate request body
  if (!currencyCode) {
    return res
      .status(400)
      .json({ message: "Missing required field: currencyCode." })
  }

  try {
    const [results] = await db
      .promise()
      .query("INSERT INTO currencies (currencyCode) VALUES (?)", [currencyCode])

    res.status(201).json({
      message: "Currency created successfully.",
      currencyId: results.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error creating currency." })
  }
})

// Update an existing currency by currencyId
route.put("/api/currencies/:currencyId", async (req, res) => {
  const { currencyId } = req.params
  const { currencyCode } = req.body

  // Validate request body
  if (!currencyCode) {
    return res
      .status(400)
      .json({ message: "Missing required field: currencyCode." })
  }

  try {
    const [results] = await db
      .promise()
      .query("UPDATE currencies SET currencyCode = ? WHERE currencyId = ?", [
        currencyCode,
        currencyId,
      ])

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Currency not found." })
    }

    res.json({ message: "Currency updated successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error updating currency." })
  }
})

// Delete a currency by currencyId
route.delete("/api/currencies/:currencyId", async (req, res) => {
  const { currencyId } = req.params

  try {
    const [results] = await db
      .promise()
      .query("DELETE FROM currencies WHERE currencyId = ?", [currencyId])

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Currency not found." })
    }

    res.json({ message: "Currency deleted successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error deleting currency." })
  }
})
