const { readFileSync: read } = require("fs");
const path = require("path");

const EMPTY_STRING = "";

const input = read(path.join(__dirname, "input.txt"), "utf-8");

// strip out all the letters, trim the end of file newline and split each line into an array
const lines = input.replace(/[a-z]/gim, EMPTY_STRING).trim().split(/\r?\n/);
const result = lines
  .map((line) => {
    if (line.length === 1) {
      return line + line;
    }

    return `${line[0]}${line.slice(-1)}`;
  })
  .reduce((carry, value) => {
    return (carry += parseInt(value));
  }, 0);

console.log(result);
