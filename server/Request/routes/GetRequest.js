const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// GET route to retrieve all requests
router.get("/", async (req, res) => {
  try {
    // Retrieve all requests from the database
    const requests = await Request.find();

    // Send the requests as JSON in the response
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error getting requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// GET route to retrieve requests with status "pending"
router.get("/pending", async (req, res) => {
  try {
    // Retrieve requests with status "pending" from the database
    const pendingRequests = await Request.find({ status: "Pending" });

    console.log(pendingRequests);
    // Send the pending requests as JSON in the response
    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error("Error getting pending requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/completed", async (req, res) => {
  try {
    // Retrieve requests with status "pending" from the database
    const completeRequest = await Request.find({ status: "Completed" });

    console.log(completeRequest);
    // Send the pending requests as JSON in the response
    res.status(200).json(completeRequest);
  } catch (error) {
    console.error("Error getting pending requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
