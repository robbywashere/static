import React from "react";
import ReactDOM from "react-dom";

export const Page1 = () => (
  <div>
    <h1>Page1 :)</h1>
  </div>
);

ReactDOM.hydrate(<Page1 />, document.querySelector("#target"));
