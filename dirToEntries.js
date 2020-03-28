const { readdirSync } = require("fs");
const path = require("path");
function dirToEntries(dir, fn = (x) => x) {
  return readdirSync(path.resolve(dir)).reduce(
    (p, f) => ({
      ...p,
      [f.split(/.[a-z]{0,2}$/i)[0]]: fn(`${dir}/${f}`),
    }),
    {}
  );
}
exports.dirToEntries = dirToEntries;
