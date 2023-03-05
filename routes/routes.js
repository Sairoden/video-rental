const genreRouter = require("./genres");
const customerRouter = require("./customers");
const movieRouter = require("./movies");
const rentalRouter = require("./rentals");
const userRouter = require("./users");
const authRouter = require("./auth");
const error = require("../middleware/error");

const express = require("express");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/genres/", genreRouter);
  app.use("/api/customers/", customerRouter);
  app.use("/api/movies/", movieRouter);
  app.use("/api/rentals/", rentalRouter);
  app.use("/api/users/", userRouter);
  app.use("/api/auth/", authRouter);
  app.all("*", (req, res, next) => {
    res.status(404).send("The route for this url couldn't be found");
    next();
  });
  app.use(error);
};
