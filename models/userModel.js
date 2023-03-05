const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// schema
// model
// name, email unique:true, password

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  password: { type: String, required: true, minLength: 6, maxLength: 1024 },
  isAdmin: { type: Boolean },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema);

exports.User = User;
