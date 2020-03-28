import React from "react";
import ReactDOM from "react-dom";
import StyledComponent from "../StyledComponent";
import { Main } from "layout/main";
import styled from "styled-components";
import { bigTeal, teal, lavender, gold, purple, gray } from "../styles/colors.scss";
import PostData from "posts.meta";
import { format } from "date-fns";
// import Button from "react-bulma-components/lib/components/button"; //import from src, not lib

const Container = styled.div`
  max-width: 900px;
`;

const PostImg = styled.div/* css */ `
  display: inline-block;
  width: 100px;
  height: 100px;
  background-image: url("${(props) => props.img}");
  background-size: cover;
  border-radius: 10px;
  flex-shrink: 0;

`;

const PostContent = styled.div`
  margin-left: 11px;
  border-left: 1px dashed ${gold};
  min-width: 0;
  padding-left: 11px;
`;

const PostCard = styled.a`
  padding: 22px;
  display: flex;
  margin-bottom: 33px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.0675);
  border-bottom: 3px solid ${gold};
  &:hover {
    background: ${gray};
  }
`;

const PostSummary = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
`;

const PostTime = styled.time`
  color: #a0a0a0;
  font-size: 12px;
`;
const Heading = styled.h1`
  font-size: 24px;
`;

const Post = ({ summary, date, title, img, slug }) => (
  <PostCard href={slug + ".html"}>
    <PostImg img={img} />
    <PostContent>
      <PostTime dateTime={new Date(date).toISOString()}>{format(new Date(date), "MMMM dd, yyyy")}</PostTime>
      <h3>{title}</h3>
      <PostSummary>{summary}</PostSummary>
    </PostContent>
  </PostCard>
);

const Home = () => (
  <Main>
    <Heading>Home</Heading>
    {/* <StyledComponent />
    <Button color="primary">My Bulma button</Button> */}
    <Container>
      {Object.entries(PostData.meta).map(([name, { matter: data }]) => (
        <Post {...data} />
      ))}
    </Container>
  </Main>
);

ReactDOM.render(<Home />, document.querySelector("#target"));
