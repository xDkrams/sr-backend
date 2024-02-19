const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const requestApiRoutes = require("./Request/routes/Api");
const userApiRoutes = require("./User/routes/userApi");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware with specific origin and *
app.use(
  cors({
    origin: ["https://sr-fe.vercel.app", "*"],
  })
);

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
