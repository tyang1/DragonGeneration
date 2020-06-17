const pool = require("../../databasePool");
const TraitTable = require("../../app/trait/table");

class DragonTraitTable {
  static storeDragonTrait({ traitType, traitValue, dragonId }) {
    return new Promise(async (resolve, reject) => {
      const { traitId } = await TraitTable.getTraitId({
        traitType,
        traitValue,
      });
      console.log("traitId", traitId);
      pool.query(
        `INSERT INTO dragonTrait("traitId", "dragonId") VALUES($1, $2) RETURNING id`,
        [traitId, dragonId],
        (error, response) => {
          try {
            if (error) reject(error);
            let dragonTraitId = response.rows[0].id;
            resolve(dragonTraitId);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
}

// DragonTraitTable.storeDragonTrait({
//   traitType: "backgroundColor",
//   traitValue: "black",
//   dragonId: 3,
// })
//   .then(({ dragonTraitId }) => {
//     console.log("dragonTraitId", dragonTraitId);
//   })
//   .catch((err) => console.error(err));

module.exports = DragonTraitTable;
