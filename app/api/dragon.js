const { Router } = require("express");
const app = require("../index.js");
const router = new Router();

router.get("/new", (req, res) => {
  // res.json({ success: true });
  res.json({ dragon: req.app.locals.engine.generation.createDragon() });
});

module.exports = router;
