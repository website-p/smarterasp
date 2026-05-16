// server.js

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Express server is running successfully 🚀");
});

// Health Check Route
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

// Simple API Route
app.get("/api/message", (req, res) => {
    res.json({
        success: true,
        message: "Hello from Express API"
    });
});

// Echo POST Route
app.post("/api/echo", (req, res) => {
    res.json({
        you_sent: req.body
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});