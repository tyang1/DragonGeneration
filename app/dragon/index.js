const TRAIT = require("../../data/traits.json");

const DEFAULT_TRAITS = {
  nickname: "NA",
  generationId: undefined,
  get birthday() {
    return new Date();
  },
  get getRandomTraits() {
    const traits = [];
    TRAIT.forEach((trait) => {
      let traitType = trait.type;
      let traitValues = trait.values;
      let traitValue =
        traitValues[Math.floor(Math.random() * traitValues.length)];
      traits.push({ traitType, traitValue });
    });
    return traits;
  },
};

class Dragon {
  constructor({ nickname, birthday, traits, generationId } = {}) {
    this.nickname = nickname || DEFAULT_TRAITS.nickname;
    this.birthday = birthday || DEFAULT_TRAITS.birthday;
    this.traits = traits || DEFAULT_TRAITS.getRandomTraits;
    this.generationId = generationId || DEFAULT_TRAITS.generationId;
    this.dragonId = null;
  }
}

module.exports = Dragon;
