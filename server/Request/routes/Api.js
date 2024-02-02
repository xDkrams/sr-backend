const express = require("express");
const router = express.Router();

const createRequestRoutes = require("./CreateRequest");
const getRequestRoutes = require("./GetRequest");
const updateRequestRoutes = require("./UpdateRequest");

router.use("/postRequests", createRequestRoutes);
router.use("/getRequests", getRequestRoutes);
router.use("/updateRequests", updateRequestRoutes);
module.exports = router;
