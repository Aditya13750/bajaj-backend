const express = require("express");
const router = express.Router();
const { processData, getOperationCode } = require("../controllers/bfhlController");

router.get('/', (req, res) => {
    res.send("the server is working fine.");
})
router.post("/bfhl", processData);
router.get("/bfhl", getOperationCode);

module.exports = router;

