const { Router } = require("express");
const DragonTable = require("../dragon/table");
// const app = require("../index.js");
const router = new Router();

router.get("/new", (req, res, next) => {
  const dragon = req.app.locals.engine.generation.createDragon();
  DragonTable.storeDragon(dragon)
    .then(({ dragonId }) => {
      dragon.dragonId = dragonId;
      res.json({ dragon });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
