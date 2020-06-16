const { Pool } = require("pg");
const databaseConfiguration = require("./secrets/databaseConfiguration");

const pool = new Pool(databaseConfiguration);

module.exports = pool;

pool.query("SELECT * FROM generation", (error, response) => {
  if (error) return console.log("error", error);
  console.log("generation response.rows", response.rows);
});

pool.query("SELECT * FROM dragon", (error, response) => {
  if (error) return console.log("error", error);
  console.log("dragon response.rows", response.rows);
});

pool.query("SELECT * FROM trait", (error, response) => {
  if (error) return console.log("error", error);
  console.log("trait response.rows", response.rows);
});
