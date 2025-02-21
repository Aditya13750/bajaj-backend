const express = require("express");
const connectWithDB = require("./config/db");
const cors = require("cors");
const router = require("./routes/router");
require("dotenv").config();

const app = express();

// Connect to Database
connectWithDB();

app.use(express.json());

// CORS Configuration
const corsOptions = {
    origin: process.env.frontendURL ,
    methods: ['GET','POST'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use("/app", router);

app.get("/", (req, res) => {
    res.send("The server is working fine.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});
