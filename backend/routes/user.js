// routes/user.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const pool = require("../db");

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, username FROM users WHERE id = ?", [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
