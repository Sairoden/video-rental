const express = require("express");
const mongoose = require("mongoose");

const { Rental } = require("../models/rentalModel");
const { Customer } = require("../models/customerModel");
const { Movie } = require("../models/movieModel");
const auth = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const rentals = await Rental.find().sort("-dateOut");

      return res.status(200).send(rentals);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  })
  .post(auth, async (req, res) => {
    try {
      const customer = await Customer.findById(req.body.customerId);
      if (!customer) return res.status(400).send("Invalid Customer");

      const movie = await Movie.findById(req.body.movieId);
      if (!movie) return res.status(400).send("Invalid Movie");

      if (movie.numberInStock === 0)
        return res.status(400).send("Movies not in stock");

      const rental = await Rental.create({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
      });

      movie.numberInStock--;
      movie.save();

      return res.status(200).send(rental);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
  });

module.exports = router;

// 9
