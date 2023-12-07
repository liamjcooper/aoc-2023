const path = require("path");

const { read } = require("../lib");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const multiply = (first, second) => first * second;

const parse = (game) =>
  game
    .split(": ")[1]
    .split("; ")
    .map((hand) =>
      hand.split(", ").reduce((carry, total) => {
        const [amount, colour] = total.split(" ");

        carry[colour] = Number(amount);

        return carry;
      }, {})
    );

const valid = ({ red, green, blue }) =>
  (red ?? 0) <= MAX_RED && (green ?? 0) <= MAX_GREEN && (blue ?? 0) <= MAX_BLUE;

const input = read(path.join(__dirname, "input.txt")).trim().split(/\r?\n/);
const parsed = input.map(parse);

const first = parsed.reduce((carry, game, index) => {
  const id = index + 1;
  const valids = game.filter(valid);

  if (game.length === valids.length) {
    carry += id;
  }

  return carry;
}, 0);

const second = parsed.reduce((carry, game) => {
  const highest = { red: 0, green: 0, blue: 0 };

  game.forEach((outcome) => {
    if (outcome.red > highest.red) {
      highest.red = outcome.red;
    }

    if (outcome.green > highest.green) {
      highest.green = outcome.green;
    }

    if (outcome.blue > highest.blue) {
      highest.blue = outcome.blue;
    }
  });

  return (carry += Object.values(highest)
    .map(Number)
    .filter(Boolean)
    .reduce(multiply));
}, 0);

console.log(`First answer: ${first}`);
console.log(`Second answer: ${second}`);
