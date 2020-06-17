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
  static getDragonTrait({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "traitType", "traitValue" 
         FROM trait 
         INNER JOIN dragonTrait
         ON dragonTrait."traitId"=trait.id
         WHERE dragonTrait."dragonId"=$1`,
        [dragonId],
        (error, response) => {
          try {
            if (error) reject(error);
            if (!response.rows.length) reject(new Error("no dragon trait"));
            resolve(response.rows);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
}

// DragonTraitTable.getDragonTrait({ dragonId: 1 })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

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
