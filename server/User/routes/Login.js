const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // User not found
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the user has a hashed password and salt
    if (!existingUser.hashedPassword || !existingUser.salt) {
      return res.status(500).json({ message: "Invalid user data" });
    }

    // Compare the entered password with the stored hashed password using the stored salt
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );
    console.log("Entered Password:", password);
    console.log("Stored Hash:", existingUser.hashedPassword);
    console.log("Salt:", existingUser.salt);
    if (isPasswordValid) {
      // Password is valid, proceed with login
      return res.status(200).json({ message: "Login successful" });
    } else {
      // Password is not valid
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
