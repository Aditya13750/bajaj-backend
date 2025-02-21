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
    origin: "https://bajaj-frontend-smoky-zeta.vercel.app/" || "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    if (!req.secure) {
        console.warn("Warning: Insecure HTTP request received.");
    }
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});


app.use("/app", router);

app.get("/", (req, res) => {
    res.send("The server is working fine.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});
