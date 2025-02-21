const express = require("express");
const connectWithDB = require("./config/db");
const cors = require("cors"); // Import only once
const router = require("./routes/router");
require("dotenv").config();

const app = express();

// Connect to the database
connectWithDB();

// Define CORS options
const corsOptions = {
    origin: "https://bajaj-frontend-smoky-zeta.vercel.app", // Allow frontend requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Enable cookies/auth headers
};

// Apply CORS middleware before other middlewares
app.use(cors(corsOptions));

// Enable preflight for all routes
app.options('*', cors(corsOptions));

// Enable JSON body parsing
app.use(express.json());

// Debugging log for incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// API routes
app.use("/app", router);

// Test route
app.get("/", (req, res) => {
    res.send("The server is working fine.");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});
