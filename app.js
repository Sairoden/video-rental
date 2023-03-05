require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
require("./routes/routes")(app);

app.use(helmet());
app.use(compression());
app.use(express.json());

module.exports = app;
