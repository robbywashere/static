import React from "react";
import ReactDOM from "react-dom";

export const Page2 = () => (
  <div>
    <h1>Page2</h1>
  </div>
);

ReactDOM.hydrate(<App />, document.querySelector("#target"));
