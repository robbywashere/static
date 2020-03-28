import React from "react";
import ReactDOM from "react-dom";
// import { StyledComponent } from "../StyledComponent";

export const Home = () => (
  <div>
    <h1>Home</h1>
    {/* <StyledComponent /> */}
  </div>
);

ReactDOM.hydrate(<Home />, document.querySelector("#target"));
