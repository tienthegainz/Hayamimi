import React from 'react';
import { Row, Col } from 'antd';
import UploadPost from './UploadPost';
import Post from './Post';
import data from '../../fake_data.json';

const Feed = () => {
  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <UploadPost />
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
    </Row>
  );
};

export default Feed;
