import React from "react";
import { Helmet } from "react-helmet";
import { Main } from "../layout/main";
import { format } from "date-fns";
import styled from "styled-components";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 55px;
  padding-right: 55px;
`;
const Img = styled.img`
  border-radius: 10px;
`;

const Time = styled.time`
  text-decoration: underline;
  font-style: italic;
`;

export const BlogLayout = ({ children, html, matter = {} }) => (
  <Main>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{matter.title}</title>
    </Helmet>
    <Content>
      <h1>{matter.title}</h1>
      <h3 style={{ fontStyle: "italic" }}>{matter.summary}</h3>
      {matter.author && <h3>Posted by: {matter.author}</h3>}
      {matter.date && <Time dateTime={matter.date.toISOString()}>{format(matter.date, "MMMM dd, yyyy")}</Time>}
      <br />
      {matter.img && <Img src={matter.img}></Img>}
      <Article dangerouslySetInnerHTML={{ __html: html }}></Article>
    </Content>
  </Main>
);
