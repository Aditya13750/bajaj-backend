const express = require('express');
const connectWithDB = require('./config/db');
const app = express();
const cors = require('cors');
const router = require('./routes/router');
require("dotenv").config();

connectWithDB();

app.use(cors());

app.use(express.json());

app.use("/", router);


app.listen(process.env.port, () => {
    console.log(`the app is running on ${process.env.port}`);
});