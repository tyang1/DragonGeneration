const Generation = require("./");
const GenerationTable = require("./table");
const DragonTable = require("../dragon/table");

class GenerationEngine {
  constructor() {
    this.generation = null;
    this.timer = null;
  }

  start() {
    this.buildNewGeneration();
  }
  end() {
    clearTimeout(this.timer);
  }
  buildNewGeneration() {
    const generation = new Generation();
    GenerationTable.storeGeneration(generation)
      .then(({ generationId }) => {
        this.generation = generation;
        this.generation.generationId = generationId;
        console.log("buildNewGeneraton", this.generation.createDragon());
        this.timer = setTimeout(() => {
          this.buildNewGeneration();
        }, this.generation.expiration.getTime() - Date.now());
      })
      .catch((error) => console.error(error));
  }
}

module.exports = GenerationEngine;
