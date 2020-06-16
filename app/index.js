const express = require("express");
const GenerationEngine = require("./generation/engine");
const dragonRoute = require("./api/dragon.js");
const generationRoute = require("./api/generation.js");

const app = express();

const engine = new GenerationEngine();
engine.start();
setTimeout(() => {
  engine.end();
}, 5000);

app.locals.engine = engine;
app.use("/dragon", dragonRoute);
app.use("/generation", generationRoute);

app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  if (err) {
    res.status(statusCode).json({ type: "err", message: err.message });
  }
});

module.exports = app;
