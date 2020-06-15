const express = require("express");
const GenerationEngine = require("./generation/engine");
const engine = new GenerationEngine();
const dragonRoute = require("./api/dragon.js");
const generationRoute = require("./api/generation.js");

const app = express();

engine.start();
setTimeout(() => {
  engine.end();
}, 5000);

app.locals.engine = engine;
app.use("/dragon", dragonRoute);
app.use("/generation", generationRoute);

module.exports = app;
