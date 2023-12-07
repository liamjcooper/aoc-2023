const { readFileSync: read } = require("fs");

module.exports = (path, encoding = "utf-8") => read(path, encoding);
