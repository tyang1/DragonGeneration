const pool = require("../../databasePool");
const DragonTable = require("../dragon/table");
const DragonTraitTable = require("../dragonTrait/table");
const Dragon = require("../dragon");

const getDragonWithTrait = ({ dragonId }) => {
  return Promise.all([
    DragonTable.getDragon({ dragonId }),
    DragonTraitTable.getDragonTrait({ dragonId }),
  ])
    .then(([dragon, dragonTraits]) => {
      //   dragon.id = dragonId;
      //   dragon.traits = dragonTraits;
      //   return dragon;
      return new Dragon({ ...dragon, dragonId, traits: dragonTraits });
    })
    .catch((err) => {
      console.log(err);
    });
};

// getDragonWithTrait({ dragonId: 1 })
//   .then((dragon) => console.log(dragon))
//   .catch((err) => console.log(err));

module.exports = { getDragonWithTrait };
