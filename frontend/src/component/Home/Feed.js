import React from "react";
import { Col, Card, Input, Button } from "antd";
import Post from "../Post/Post.js";
import data from "../../fake_data.json";

const Feed = () => {
  const { TextArea } = Input;

  return (
    <>
      <Col span={24}>
        <Card title="Home">
          <TextArea placeholder="What's happening?" autoSize={{ minRows: 2 }} />
          <Button type="primary" style={{ float: "right", marginTop: 15 }}>
            Tweet
          </Button>
        </Card>
      </Col>
      {data.posts.map((post, idx) => {
        const user = data.users.find((user) => user.id === post.user_id);
        let comments = data.comments.filter((cmts) => cmts.post_id === post.id);
        comments = comments.map((cmt) => {
          const user = data.users.find((user) => user.id === cmt.user_id);
          return { ...cmt, author: user.name, avatar: user.avatar };
        });
        return (
          <Post
            key={idx}
            content={post.content}
            img={post.image}
            user={user}
            comments={comments}
          />
        );
      })}
    </>
  );
};

export default Feed;
