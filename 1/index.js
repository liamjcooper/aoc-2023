const { readFileSync: read } = require("fs");
const path = require("path");

const EMPTY_STRING = "";
const DIGIT_MAP = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const sum = (first, second) => (first += second);
const strip = (string, matcher) => string.replace(matcher, EMPTY_STRING);

const input = read(path.join(__dirname, "input.txt"), "utf-8");
const lines = input.trim().split(/\r?\n/);

const numberWordMatcher = new RegExp(Object.keys(DIGIT_MAP).join("|"), "gi");

const [first, second] = [
  lines,
  lines.map((line) => {
    let match;

    // run a loop that will put the cursor of the regex matching back 1 index
    // in the current string so that overlapping number words such as oneight
    // (which should become 18) are not missed out by the eager matching
    // the below code will simply add the last character of a matching number
    // word to the end of every match so that it is no longer overlapping and
    // each word is its own number
    while ((match = numberWordMatcher.exec(line))) {
      const word = match[0];
      line =
        line.slice(0, match.index + word.length) +
        word[word.length - 1] +
        line.slice(match.index + word.length);
      numberWordMatcher.lastIndex = match.index + 1;
    }

    return line.replace(numberWordMatcher, (word) => DIGIT_MAP[word]);
  }),
].map((values) =>
  values
    .map((line) => strip(line, /[a-z]/gi))
    .map((numbers) => `${numbers[0]}${numbers.slice(-1)}`)
    .map(Number)
    .reduce(sum, 0)
);

console.log(`First answer: ${first}`);
console.log(`Second answer: ${second}`);
