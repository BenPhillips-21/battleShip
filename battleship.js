const ship = (length, hitsTaken, sunken) => ({
  length,
  hitsTaken,
  sunken,
  hit: function () {
    this.hitsTaken += 1
    return this.hitsTaken
  },
  isSunk: function () {
    if (this.hitsTaken === this.length) {
        this.sunken = true
        return this.sunken
    }
  }
});

module.exports = { ship }