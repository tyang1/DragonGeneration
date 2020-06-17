const pool = require("../../databasePool");
const DragonTraitTable = require("../../app/dragonTrait/table");

class DragonTable {
  static storeDragon(dragon) {
    return new Promise((resolve, reject) => {
      const { nickname, birthday, generationId } = dragon;
      pool.query(
        `INSERT INTO dragon(nickname, birthday, "generationId") VALUES($1, $2, $3) RETURNING id`,
        [nickname, birthday, generationId],
        async (error, response) => {
          if (error) reject(error);
          try {
            const dragonId = response.rows[0].id;
            //how to let dragonTrait happens in the background to speed this up?
            //if there's an error from the dragonTrait,
            Promise.all(
              dragon.traits.map(({ traitType, traitValue }) => {
                return DragonTraitTable.storeDragonTrait({
                  traitType,
                  traitValue,
                  dragonId,
                });
              })
            )
              .then(() => {
                resolve({ dragonId });
              })
              .catch((err) => {
                reject(err);
              });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
  static getDragon({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT birthday, nickname, "generationId" 
         FROM dragon 
         WHERE dragon.id = $1`,
        [dragonId],
        (error, response) => {
          if (error) reject(error);
          if (!response.rows.length) {
            return reject(new Error("no dragon"));
          }
          resolve(response.rows[0]);
        }
      );
    });
  }
}

// DragonTable.getDragon({ dragonId: 1 })
//   .then((dragon) => console.log("the dragon", dragon))
//   .catch((err) => console.log(err));

module.exports = DragonTable;
