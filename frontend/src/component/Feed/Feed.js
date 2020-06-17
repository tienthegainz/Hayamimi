import React from 'react';
import { Row, Col } from 'antd';
import SideBar from '../Bar/SideBar';
import UploadPost from './UploadPost';
import Post from './Post';
import data from '../../fake_data.json';

const Feed = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={16}>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <UploadPost />
          </Col>
          {data.posts.map((post, idx) => {
            const user = data.users.find((user) => user.id === post.user_id);
            let comments = data.comments.filter(
              (cmts) => cmts.post_id === post.id
            );
            comments = comments.map((cmt) => {
              const user = data.users.find((user) => user.id === cmt.user_id);
              return { ...cmt,
                 author: user.name,
                 avatar: user.avatar, 
                 date: post.date,
                };
            });
            return (
              <Post
                key={idx}
                id={post.id}
                content={post.content}
                img={post.image}
                user={user}
                like={post.like}
                comments={comments}
              />
            );
          })}
        </Row>
      </Col>

      <Col span={8}>
        <Row gutter={[0, 24]}>
          <SideBar />
        </Row>
      </Col>
    </Row>
  );
};

export default Feed;
