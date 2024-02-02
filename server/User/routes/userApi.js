const express = require("express");
const router = express.Router();

const register = require("./Register");
const login = require("./Login");

router.use("/register", register);
router.use("/login", login);

module.exports = router;
