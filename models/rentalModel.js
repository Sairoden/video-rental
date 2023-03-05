const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true, minLength: 5, maxLength: 50 },
      isGold: { type: Boolean, default: false },
      phone: { type: String, required: true },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true,
      },
      dailyRentalRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 255,
        required: true,
      },
    }),
    required: true,
  },
  dateOut: { type: Date, default: Date.now(), required: true },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});

const Rental = mongoose.model("Rental", rentalSchema);

exports.Rental = Rental;
