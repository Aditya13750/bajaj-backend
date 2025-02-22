const express = require("express");
const connectWithDB = require("./config/db");
const cors = require("cors");
const router = require("./routes/router");
require("dotenv").config();

const app = express();

connectWithDB();

app.use(express.json());


const cors = require('cors');
app.use(cors({
    origin: 'https://bajaj-frontend-smoky-zeta.vercel.app/',
    credentials: true,
    methods: ["GET","POST"],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
}));


app.use("/app/", router);

app.get("/", (req, res) => {
    res.send("The server is working fine.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});
