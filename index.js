const express = require("express");
const connectWithDB = require("./config/db");
const cors = require("cors");
const router = require("./routes/router");
require("dotenv").config();

const app = express();

// Connect to the database
connectWithDB();

// ✅ Allow CORS for your frontend
const corsOptions = {
    origin: "https://bajaj-frontend-smoky-zeta.vercel.app", // ✅ Allow specific frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Allow all necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow required headers
    credentials: true, // ✅ Allow cookies/auth headers
};

// ✅ Apply CORS middleware before any other middleware
app.use(cors(corsOptions));

// ✅ Enable preflight requests for all routes
app.options("*", cors(corsOptions));

// ✅ Body parsing middleware (Must be after CORS)
app.use(express.json());

// ✅ Debugging middleware for incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// ✅ Apply your routes
app.use("/app", router);

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("The server is working fine.");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});
