import React from "react";
import ReactDOM from "react-dom";

export const Page2 = () => (
  <div>
    <h1>Page2</h1>
  </div>
);

ReactDOM.hydrate(<Page2 />, document.querySelector("#target"));
