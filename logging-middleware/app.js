// app.js
const express = require("express");
const { Log } = require("./logger");

const app = express();
app.use(express.json());

// Health check route
app.get("/health", async (req, res) => {
  await Log("backend", "info", "route", "Health check endpoint accessed.");
  res.send("App is healthy");
});

// Sample login route
app.post("/login", async (req, res) => {
  const { username, isAdmin } = req.body;

  if (typeof isAdmin !== "boolean") {
    await Log("backend", "error", "handler", "received string, expected bool");
    return res.status(400).send("Invalid data: isAdmin must be boolean");
  }

  await Log("backend", "info", "handler", `User ${username} logged in successfully.`);
  res.status(200).send("Login success");
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
