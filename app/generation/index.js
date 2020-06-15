const { SECONDS, REFRESH_RATE } = require("../config");
const Dragon = require("../dragon");

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
  constructor() {
    this.expiration = this.calculateExpiration();
    this.generationId = undefined;
    //get refresh rate
    //randomly create expiration by subtracting or adding to the refreshRate
  }
  calculateExpiration() {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));
    const msUntilExp =
      Math.random() < 0.5
        ? refreshRate - expirationPeriod
        : refreshRate + expirationPeriod;
    return new Date(Date.now() + msUntilExp);
  }

  createDragon() {
    if (Date.now() > this.expiration) {
      throw Error(`This expiration has reached ${this.expiration}`);
    }
    const newDragon = new Dragon({ generationId: this.generationId });
    return newDragon;
  }
}

module.exports = Generation;
