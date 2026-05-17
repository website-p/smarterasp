// server.js

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.set('trust proxy', true);

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

app.get("/deploy-check", (req, res) => {
    res.json({
        success: true,
        message: "Auto deploy is working 🚀",
        deployedAt: new Date().toISOString(),
        version: "1.0.1"
    });
});

// Client Info Route - Get request details and client IP
app.get("/client-info", (req, res) => {
    // Get client IP (handles proxy headers)
    const clientIp = req.headers['x-forwarded-for'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress || 
                     req.ip;
    
    res.json({
        success: true,
        client: {
            ip: clientIp,
            userAgent: req.get('user-agent'),
            language: req.get('accept-language'),
            referer: req.get('referer') || 'Direct access'
        },
        request: {
            method: req.method,
            url: req.url,
            timestamp: new Date().toISOString()
        }
    });
});

// Deployment Test Route - Useful for CI/CD pipeline verification
app.get("/deploy-test", (req, res) => {
    const deploymentInfo = {
        success: true,
        message: "Deployment successful! ✅",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        deploymentId: Math.random().toString(36).substring(7),
        features: {
            expressVersion: require('express/package.json').version,
            nodeVersion: process.version,
            platform: process.platform
        },
        headers: {
            host: req.get('host'),
            'x-deployment-id': req.get('x-deployment-id') || 'manual-test'
        }
    };
    
    res.json(deploymentInfo);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});