const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 255 },
  phone: { type: Number, required: true },
  isGold: { type: Boolean, required: true, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
