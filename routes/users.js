const express = require("express");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const auth = require("../middleware/auth");
const { User } = require("../models/userModel");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = await User.create(_.pick(req.body, ["name", "email", "password"]));

    const token = user.generateAuthToken();

    return res
      .status(201)
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
});

router.route("/me").get(auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;

