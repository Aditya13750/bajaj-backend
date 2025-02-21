const express = require("express");
const router = express.Router();
const { processData, getOperationCode } = require("../controllers/bfhlController");

router.post("/bfhl", processData);
router.get("/bfhl", getOperationCode);

module.exports = router;

