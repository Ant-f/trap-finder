class LocationGenerator {
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  generateLocations(width, height, trapCount) {
    const traps = {};

    for (let n = 0; n < trapCount; n++) {
      const x = this.getRandomInt(width);
      const y = this.getRandomInt(height);

      if (traps[x]) {
        traps[x].push(y);
      }
      else {
        traps[x] = [y];
      }
    }

    return traps;
  }
}

export default LocationGenerator;
