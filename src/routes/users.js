const express = require("express");
const router = express.Router();
const { users } = require("../data/users");
const authMiddleware = require("../middleware/auth");

// Obtener todos los usuarios
router.get("/", authMiddleware, (req, res) => {
  res.json(users);
});

// Obtener usuario por ID
router.get("/:id", authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// Crear usuario
router.post("/", authMiddleware, (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Eliminar usuario
router.delete("/:id", authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

module.exports = router;
