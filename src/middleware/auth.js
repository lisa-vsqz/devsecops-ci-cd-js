// CÓDIGO CON VULNERABILIDADES INTENCIONALES PARA DEMOSTRACIÓN

module.exports = function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  // VULNERABILIDAD 1: Hardcoded Secret (CodeQL lo detectará)
  const SECRET_TOKEN = "super-secret-token-12345";

  // VULNERABILIDAD 2: Comparación débil sin hash
  if (!token || token !== SECRET_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // VULNERABILIDAD 3: Logging de información sensible
  console.log("User authenticated with token: " + token);

  next();
};
