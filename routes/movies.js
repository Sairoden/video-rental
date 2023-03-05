const express = require("express");
const { Movie } = require("../models/movieModel.js");
const { Genre } = require("../models/genreModel.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const movies = await Movie.find();

      if (!movies) throw new Error("No movies in the database");

      return res.status(200).send(movies);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  })
  .post(auth, async (req, res) => {
    try {
      const genre = await Genre.findById(req.body.genre);
      if (!genre) throw new Error("Genre not found");

      const movie = await Movie.create({
        title: req.body.title,
        genre: { _id: genre._id, name: genre.name },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      });

      return res.status(201).send(movie);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) throw new Error("Movie not found");

      return res.status(200).send(movie);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!movie) throw new Error("Movie not found");

      return res.status(200).send(movie);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);

      if (!movie) throw new Error("Movie not found");

      return res.status(200).send(movie);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  });

module.exports = router;
