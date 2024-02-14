const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const transporter = require("../../mailer/nodemailer");

// Sample API route to create and save a new request
const convertKeysToCamelCase = (data) => {
  const convertedData = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
      convertedData[camelCaseKey] = data[key];
    }
  }

  return convertedData;
};
router.post("/", async (req, res) => {
  try {
    const requestDataFromFrontend = req.body;

    // Access the nested formData object if it exists
    const formData = requestDataFromFrontend.formData || {};

    // Extract checkbox values
    const checkboxes = {
      coe: requestDataFromFrontend.coe || false,
      COEWithCompensation: requestDataFromFrontend.COEWithCompensation || false,
      payslip: requestDataFromFrontend.payslip || false,
      ServiceRecord: requestDataFromFrontend.ServiceRecord || false,
    };

    // Map formData properties to corresponding properties in Request model
    const mappedData = {
      firstName: requestDataFromFrontend["First Name"] || "",
      lastName: requestDataFromFrontend["Last Name"] || "",
      email: formData.Email || "",
      Office: requestDataFromFrontend.Office || "",
      ...checkboxes,
      ...convertKeysToCamelCase(requestDataFromFrontend),
    };

    // Check if there is an existing request with the same full name and pending or ongoing status
    const existingRequest = await Request.findOne({
      firstName: mappedData.firstName,
      lastName: mappedData.lastName,
      status: { $in: ["Pending", "Ongoing"] },
    });

    if (existingRequest) {
      return res.status(400).json({
        message:
          "Request with the same full name has pending or ongoing status already exists",
      });
    }

    // Find the latest request in the database
    const latestRequest = await Request.findOne({}, {}, { sort: { date: -1 } });

    // Calculate the new requestNumber
    const newRequestNumber = latestRequest
      ? latestRequest.requestNumber + 1
      : 1;

    // Use the mapped data to create a new request
    const newRequest = new Request({
      ...mappedData,
      requestNumber: newRequestNumber,
      dateRequest: new Date(),
    });

    // Save the new request to the database
    await newRequest.save();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newRequest.email, // Use the email address from the request data
      subject: "New Request Created",
      text: "A new request has been created.",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({
      message: `Request created successfully, your request number is ${newRequestNumber}`,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
