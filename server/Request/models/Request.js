const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestNumber: { type: Number, required: true },
  firstName: String,
  lastName: String,
  email: String,
  Office: String,
  coe: Boolean,
  COEWithCompensation: Boolean,
  payslip: Boolean,
  ServiceRecord: Boolean,
  status: {
    type: String,
    enum: ["Pending", "Assigned", "Approved"],
    default: "Pending",
  },
  dateRequest: Date,
  date: Date,
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
