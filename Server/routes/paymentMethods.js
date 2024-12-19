const express = require("express")
const db = require("../database.js")
const route = express.Router()
const cors = require("cors")
app.use(cors())
// ------------------------- PAYMENT METHODS -------------------------
route.get("/api/payment-methods", (req, res) => {
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

// // Get all payment methods
// route.get("/api/payment-methods", async (req, res) => {
//   try {
//     const [results] = await db.promise().query("SELECT * FROM payment_methods")
//     res.json(results)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Error retrieving payment methods." })
//   }
// })

// Create a new payment method
route.post("/api/payment-methods", async (req, res) => {
  const { paymentMethodName } = req.body

  // Validate request body
  if (!paymentMethodName) {
    return res
      .status(400)
      .json({ message: "Missing required field: paymentMethodName." })
  }

  try {
    const [results] = await db
      .promise()
      .query("INSERT INTO payment_methods (paymentMethodName) VALUES (?)", [
        paymentMethodName,
      ])

    res.status(201).json({
      message: "Payment method created successfully.",
      paymentMethodId: results.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error creating payment method." })
  }
})

// Update an existing payment method by paymentMethodId
route.put("/api/payment-methods/:paymentMethodId", async (req, res) => {
  const { paymentMethodId } = req.params
  const { paymentMethodName } = req.body

  // Validate request body
  if (!paymentMethodName) {
    return res
      .status(400)
      .json({ message: "Missing required field: paymentMethodName." })
  }

  try {
    const [results] = await db
      .promise()
      .query(
        "UPDATE payment_methods SET paymentMethodName = ? WHERE paymentMethodId = ?",
        [paymentMethodName, paymentMethodId]
      )

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Payment method not found." })
    }

    res.json({ message: "Payment method updated successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error updating payment method." })
  }
})

// Delete a payment method by paymentMethodId
route.delete("/api/payment-methods/:paymentMethodId", async (req, res) => {
  const { paymentMethodId } = req.params

  try {
    const [results] = await db
      .promise()
      .query("DELETE FROM payment_methods WHERE paymentMethodId = ?", [
        paymentMethodId,
      ])

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Payment method not found." })
    }

    res.json({ message: "Payment method deleted successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error deleting payment method." })
  }
})
