const { Router } = require("express");
const DragonTable = require("../dragon/table");
const app = require("../index.js");
const router = new Router();

router.get("/new", (req, res) => {
  const dragon = req.app.locals.engine.generation.createDragon();
  DragonTable.storeDragon(dragon)
    .then(({ dragonId }) => {
      dragon.dragonId = dragonId;
      res.json({ dragon });
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
