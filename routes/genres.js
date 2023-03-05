const express = require("express");
const { Genre } = require("../models/genreModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const genres = await Genre.find().sort({ name: 1 });

      return res.status(200).send(genres);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  })
  .post(auth, async (req, res) => {
    try {
      const genre = new Genre(req.body);

      const result = await genre.save();

      return res.status(200).send(result);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const genre = await Genre.findById(id);

      if (!genre) return res.status(404).send("Genre not found");

      return res.status(200).send(genre);
    } catch (err) {
      next(err);
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { id } = req.params;
      const newGenre = req.body.genre;

      if (!id) return res.status(404).send("Invalid ID");

      const genre = await Genre.findByIdAndUpdate(
        id,
        {
          $set: {
            name: newGenre,
          },
        },
        { new: true }
      );

      const result = await genre.save();
      return res.status(200).send(result);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  })
  .delete([auth, admin], async (req, res) => {
    try {
      const { id } = req.params;
      const genre = await Genre.findByIdAndDelete(id);

      return res.status(200).send(genre);
    } catch (err) {
      return res.status(404).send("invalid id");
    }
  });

module.exports = router;

// 8 ka na
