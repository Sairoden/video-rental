const express = require("express");
const { Customer } = require("../models/customerModel");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const customers = await Customer.find().sort({ name: 1 });

      return res.status(200).send(customers);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  })
  .post(async (req, res) => {
    try {
      const customer = await Customer.create(req.body);
      return res.status(201).send(customer);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(id);

      return res.status(200).send(customer);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  })
  .patch(async (req, res) => {
    try {
      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      return res.status(200).send(customer);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);

      return res.status(200).send(customer);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  });

// getAll, post = /
// patch, delete, get = /:id

module.exports = router;
