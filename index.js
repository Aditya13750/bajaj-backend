const express = require("express");
const connectWithDB = require("./config/db");
const cors = require("cors");
const router = require("./routes/router");
require("dotenv").config();

const app = express();

connectWithDB();

app.use(express.json());

const corsOptions = {
    origin: "https://bajaj-frontend-smoky-zeta.vercel.app",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const cors = require('cors');
app.use(cors(corsOptions));


app.use("/app", router);

app.get("/", (req, res) => {
    res.send("The server is working fine.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});
