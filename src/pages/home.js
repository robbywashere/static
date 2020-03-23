import React from "react";
import ReactDOM from "react-dom";

export const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

ReactDOM.hydrate(<App />, document.querySelector("#target"));
