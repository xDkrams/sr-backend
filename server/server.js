const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Request = require("./Request/models/Request");
const requestApiRoutes = require("./Request/routes/Api");
const userApiRoutes = require("./User/routes/userApi");
const cors = require("cors"); // Import the cors middleware
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

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
// Middleware
app.use(bodyParser.json());

// Use the API routes
app.use("/api", requestApiRoutes);
app.use("/user", userApiRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
