const express = require("express");
const router = express.Router();

// GET request to test API
router.get("/test", (req, res) => {
  res.status(200).json({ message: "This is a test API endpoint" });
});
