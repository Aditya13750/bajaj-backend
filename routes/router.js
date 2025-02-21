const express = require("express");
const cors = require("cors"); // Import cors package
const router = express.Router();
const { processData, getOperationCode } = require("../controllers/bfhlController");

const app = express();
app.use(cors());

router.get('/', (req, res) => {
    res.send("the server is working fine.");
});
router.post("/bfhl", processData);
router.get("/bfhl", getOperationCode);

module.exports = router;
