const pool = require("../../databasePool");

class DragonTable {
  static storeDragon(dragon) {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO dragon(id, nickname, birthday) VALUES($1, $2, $3) RETURNING generationId",
        [dragon.id, dragon.nickname, dragon.birthday],
        (error, response) => {
          if (error) reject(error);
          console.log("dragon response", response);
          const generationId = response.rows[0].id;
          resolve({ generationId });
        }
      );
    });
  }
}

module.exports = DragonTable;
