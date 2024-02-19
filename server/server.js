const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Request = require("./Request/models/Request");
const requestApiRoutes = require("./Request/routes/Api");
const userApiRoutes = require("./User/routes/userApi");
const cors = require("cors"); // Import the cors middleware
require("dotenv").config();

const app = express();

// Allow CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

// Define API routes
app.use("/api", requestApiRoutes);
app.use("/user", userApiRoutes);

// Error handling for CORS preflight requests
app.options("*", cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
