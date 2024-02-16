// UpdateRequest.js

const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const transporter = require("../../mailer/nodemailer");

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
      // Notify the requestee via email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: updatedRequest.email,
        subject: "Update on Your TSSD Request",
        text: `Dear Ms/Mr. ${updatedRequest.lastName},
    
          Your TSSD request has been updated.

          - Status: ${updatedRequest.status}
        
           Thank you! \n\n`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
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
