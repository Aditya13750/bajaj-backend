const express = require("express");
const connectWithDB = require("./config/db");
const cors = require("cors");
const router = require("./routes/router");
require("dotenv").config();

const app = express();

// Connect to Database
connectWithDB();

// CORS Configuration
const corsOptions = {
    origin: process.env.frontendURL || "*",  // Ensure frontendURL is defined
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

// Middleware Setup
app.use(cors(corsOptions));  // Apply CORS first
app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(express.json());  // Parse JSON requests

// Debugging Middleware
app.use((req, res, next) => {
    if (!req.secure) {
        console.warn("Warning: Insecure HTTP request received.");
    }
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Define Routes
app.use("/app", router);  // API Routes

// Default Route (Keep it after other routes)
app.get("/", (req, res) => {
    res.send("The server is working fine.");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});
