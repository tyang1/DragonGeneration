const pool = require("../../databasePool");

class DragonTable {
  static storeDragon(dragon) {
    return new Promise((resolve, reject) => {
      const { nickname, birthday, generationId } = dragon;
      pool.query(
        `INSERT INTO dragon(nickname, birthday, "generationId") VALUES($1, $2, $3) RETURNING id`,
        [nickname, birthday, generationId],
        (error, response) => {
          if (error) reject(error);
          try {
            console.log("dragon response", response);
            const dragonId = response.rows[0].id;
            resolve({ dragonId });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
}

module.exports = DragonTable;
