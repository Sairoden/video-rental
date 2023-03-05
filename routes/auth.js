const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const { User } = require("../models/userModel");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();

    return res.status(200).header("x-auth-token", token).send(token);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
});

module.exports = router;
