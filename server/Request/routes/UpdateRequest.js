// UpdateRequest.js

const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// PUT route to update a request
router.put("/:requestId", async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const updatedData = req.body; // Assuming you want to update various fields

    // Set the update object with the status
    const updateObject = {
      $set: { status: updatedData.status },
    };

    // Check if the status is "Completed"
    if (updatedData.status === "Completed") {
      // If "Completed," set the completionDate to the current date
      updateObject.$set.date = new Date();
    } else {
      // If not "Completed," make sure the date is not set
      updateObject.$unset = { date: 1 };
    }

    // Find the request by ID and update it
    const updatedRequest = await Request.findOneAndUpdate(
      { requestNumber: requestId },
      updateObject,
      { new: true } // Return the updated document
    );

    // Check if the request was found and updated
    if (updatedRequest) {
      res.status(200).json(updatedRequest);
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
