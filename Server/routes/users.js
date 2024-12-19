const express = require("express")
const db = require("../database.js")
const route = express.Router()
const cors = require("cors")
app.use(cors())

// ------------------------- USERS -------------------------

route.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error retrieving users." })
    }
    res.json(results)
  })
})

// route.get("/api/users", async (req, res) => {
//   try {
//     const [results] = await db.promise().query("SELECT * FROM users")
//     res.json(results)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Error retrieving users." })
//   }
// })

route.post("/api/users", async (req, res) => {
  const { userName, userEmail, userCountry, currencyId, language } = req.body

  // Validate request body
  if (!userName || !userEmail || !userCountry || !currencyId || !language) {
    return res.status(400).json({ message: "Missing required fields." })
  }

  try {
    const [results] = await db
      .promise()
      .query(
        "INSERT INTO users (userName, userEmail, userCountry, currencyId, language) VALUES (?, ?, ?, ?, ?)",
        [userName, userEmail, userCountry, currencyId, language]
      )
    res.status(201).json({
      message: "User created successfully.",
      userId: results.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error creating user." })
  }
})

route.put("/api/users/:userId", async (req, res) => {
  const { userId } = req.params
  const { userName, userEmail, userCountry, currencyId, language } = req.body

  if (!userName || !userEmail || !userCountry || !currencyId || !language) {
    return res.status(400).json({ message: "Missing required fields." })
  }

  try {
    const [results] = await db
      .promise()
      .query(
        "UPDATE users SET userName = ?, userEmail = ?, userCountry = ?, currencyId = ?, language = ? WHERE userId = ?",
        [userName, userEmail, userCountry, currencyId, language, userId]
      )

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." })
    }

    res.json({ message: "User updated successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error updating user." })
  }
})

route.delete("/api/users/:userId", async (req, res) => {
  const { userId } = req.params

  try {
    const [results] = await db
      .promise()
      .query("DELETE FROM users WHERE userId = ?", [userId])

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." })
    }

    res.json({ message: "User deleted successfully." })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error deleting user." })
  }
})
