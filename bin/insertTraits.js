const pool = require("../databasePool");
const TRAITS = require("../data/traits.json");

// const traits = JSON.parse(TRAITS);
TRAITS.forEach((trait) => {
  trait.values.forEach((value) => {
    console.log(value, trait);
    pool.query(
      `INSERT INTO trait("traitType", "traitValue") 
       VALUES($1, $2) 
       RETURNING id`,
      [trait.type, value],
      (error, response) => {
        if (error) console.error(error);
        try {
          let traitId = response.rows[0].id;
          console.log(`trait data inserted as ${traitId}`);
          //   return { traitId };
        } catch (err) {
          console.error(err);
        }
      }
    );
  });
});
