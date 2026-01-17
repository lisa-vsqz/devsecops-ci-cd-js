const express = require("express");
const usersRoutes = require("./routes/users");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "User API" });
});

app.use("/api/users", usersRoutes);

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
