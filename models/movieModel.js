const mongoose = require("mongoose");
const { genreSchema } = require("./genreModel");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0, max: 255, default: 0 },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
    default: 0,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
