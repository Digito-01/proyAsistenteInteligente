const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.idUsuario, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
});

router.post("/register", async (req, res) => {
  const { Nombre, username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const [existing] = await pool.query("SELECT idUsuario FROM users WHERE username = ?", [username]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    await pool.query(
      "INSERT INTO users (Nombre, username, password) VALUES (?, ?, ?)",
      [Nombre, username, hash]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error(err);  // Agregado para depuración
    res.status(500).json({ message: "Error al registrar usuario", error: err.message });
  }
});


module.exports = router;
