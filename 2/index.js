const path = require("path");

const { read } = require("../lib");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const games = read(path.join(__dirname, "input.txt")).trim().split(/\r?\n/);

const result = games.reduce((carry, game, index) => {
  let valid = true;
  const id = index + 1;

  const set = game.split(": ")[1];
  const hands = set.split("; ");

  // check against maxes
  hands.forEach((hand) => {
    const totals = hand.split(", ");
    totals.forEach((total) => {
      const [amount, colour] = total.split(" ");

      if (
        (colour === "red" && amount > MAX_RED) ||
        (colour === "green" && amount > MAX_GREEN) ||
        (colour === "blue" && amount > MAX_BLUE)
      ) {
        valid = false;
      }
    });
  });

  if (valid) {
    carry += id;
  }

  return carry;
}, 0);

console.log(result);
