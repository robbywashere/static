import React from "react";
import ReactDOM from "react-dom";
import matter from "gray-matter";
import marked from "marked";
import Post from "../posts/__POST__.md";
import { BlogLayout } from "../layout/blog";
import { index } from "./data.json";

function parseMd(postraw) {
  const { content, data } = matter(postraw);
  return { html: marked(content), matter: data || {} };
}

class Page extends React.Component {
  state = parseMd(Post);

  update() {
    const post = parseMd(require("../posts/__POST__.md").default);
    this.setState(post);
  }
  render() {
    return <BlogLayout index={index} html={this.state.html} matter={this.state.matter}></BlogLayout>;
  }
}

const PageMount = ReactDOM.render(<Page />, document.querySelector("#target"));

if (module.hot) {
  module.hot.accept("../posts/__POST__.md", function () {
    PageMount.update();
  });
}
