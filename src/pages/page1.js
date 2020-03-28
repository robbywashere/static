import React from "react";
import ReactDOM from "react-dom";
import { Main } from "../layout/main";

const Page1 = () => (
  <Main>
    <div>
      <h1>Page1 :)</h1>
    </div>
  </Main>
);

ReactDOM.render(<Page1 />, document.querySelector("#target"));
