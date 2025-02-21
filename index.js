const express = require("express");
const connectWithDB = require("./config/db");
const cors = require("cors");
const router = require("./routes/router");
require("dotenv").config();

const app = express();

// Connect to the database
connectWithDB();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: ["https://bajaj-frontend-smoky-zeta.vercel.app"], // Allow only this origin
    methods: ["GET", "POST"], // Allow only GET and POST requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Handle preflight requests for all routes
app.options("*", cors()); // Enable preflight requests for all routes

// Routes
app.use("/app", router); // Use the router for all routes starting with /app

// Default route
app.get("/", (req, res) => {
  res.send("The server is working fine.");
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});