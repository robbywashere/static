const React = require("react");
const ReactDOM = require("react-dom");
const { ServerStyleSheet } = require("styled-components");

const renderStatic = async Component => {
  function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
  const sheet = new ServerStyleSheet();
  await new Promise(rs =>
    ReactDOM.render(sheet.collectStyles(<Component />), document.getElementById("renderTarget"), rs)
  );
  const styledCss = createElementFromHTML(sheet.getStyleTags());
  const head = document.querySelector("head");
  head.appendChild(styledCss);
  return document;
};
module.exports = renderStatic;
