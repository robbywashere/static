const { dirToEntries } = require("../dirToEntries");
const { PostMeta } = require("../PostMeta");
const path = require("path");
module.exports = function () {
  this.cacheable(false);
  const entries = dirToEntries(path.join(__dirname, "..", "src/posts"));
  const meta = PostMeta(entries);

  return `export default ${JSON.stringify({ meta })}`;
};
