const { readFileSync } = require("fs");
const matter = require("gray-matter");
function PostMeta(entries) {
  return Object.entries(entries).reduce(
    (p, [name, _path]) => ({
      ...p,
      [name]: {
        path: _path,
        virtualPath: _path.replace(/\.md$/, ".js"),
        matter: { slug: name, ...matter(readFileSync(_path)).data },
      },
    }),
    {}
  );
}
exports.PostMeta = PostMeta;
