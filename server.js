const express = require('express');
const connectWithDB = require('./config/db');
const cors = require('cors');
const router = require('./routes/router');
require("dotenv").config();

const app = express();

connectWithDB();

const corsOptions = {
    origin: process.env.frontendURL,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
    if (!req.secure) {
        console.log("Warning: Insecure HTTP request received.");
    }
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});


app.use("/", (req, res) => {
    res.send("The server is wroking fine");
})
app.use("/app", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});
