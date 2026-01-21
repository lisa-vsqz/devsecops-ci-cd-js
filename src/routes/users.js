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

// VULNERABILIDAD 1: SQL Injection simulado (CodeQL detectará)
router.get("/search", authMiddleware, (req, res) => {
  const searchTerm = req.query.q;

  // Simulación de consulta SQL insegura
  const query = "SELECT * FROM users WHERE name = '" + searchTerm + "'";
  console.log("Executing query: " + query); // Vulnerable a injection

  const results = users.filter((u) => u.name.includes(searchTerm));
  res.json(results);
});

// VULNERABILIDAD 2: Sin validación ni sanitización
router.post("/", authMiddleware, (req, res) => {
  const { name, email } = req.body;

  // Sin validación de formato
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// VULNERABILIDAD 3: Command Injection potencial
router.post("/export", authMiddleware, (req, res) => {
  const filename = req.body.filename;

  // Vulnerable: ejecuta comando con input del usuario
  const exec = require("child_process").exec;
  exec(`echo "Exporting to ${filename}"`, (error, stdout) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: "Export complete", output: stdout });
  });
});

// VULNERABILIDAD 4: Path Traversal
router.get("/download/:filename", authMiddleware, (req, res) => {
  const filename = req.params.filename;
  const filePath = `/tmp/${filename}`; // Vulnerable a path traversal

  res.download(filePath);
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
