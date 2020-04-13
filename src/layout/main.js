import styled from "styled-components";
import React from "react";
import "../styles/reset.scss";
import "../styles/custom.scss";
import "../styles/main.scss";
import { _bigTeal, _white } from "styles/colors.scss";
import PostData from "posts.meta";

const Nav = styled.div`
  height: 55px;
  color: ${_white};
  display: flex;
  justify-content: space-between;
  line-height: 55px;
  background: ${_bigTeal};
  padding-left: 33px;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.0675);
`;
Nav.Title = styled.a`
  margin: 0;
  display: inline;
  font-size: 24px;
  text-transform: lowercase;
`;
Nav.Links = styled.div`
  & > * {
    margin-right: 33px;
    text-transform: uppercase;
    color: ${_white};
    text-decoration: none;
  }
`;

const Flex = {};
Flex.Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Page = styled.div`
  margin: 33px;
`;

export const Main = ({ children }) => (
  <>
    <Nav>
      <Nav.Title href="/">Static Site</Nav.Title>
      <Nav.Links>
        {Object.entries(PostData.meta).map(([post, _meta], i) => (
          <a key={i} href={_meta.matter.slug + ".html"}>
            {post}
          </a>
        ))}
      </Nav.Links>
    </Nav>
    <Page>{children}</Page>
  </>
);
