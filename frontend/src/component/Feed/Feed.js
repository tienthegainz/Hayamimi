import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import UploadPost from './UploadPost';
import Post from './Post';
import FirebaseController from '../../firebase.js';

const Feed = () => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const followingsRef = await FirebaseController.db
      .collection('followings')
      .get();
    const followingsSnapshot = followingsRef.docs.map((doc) => doc.id);
    const postsRef = await FirebaseController.db.collection('posts').orderBy('date', 'desc').get();
    const postsSnapshot = postsRef.docs.map((doc) => doc.data());

    const data = [];
    postsSnapshot.forEach((snapshot) => {
      if (followingsSnapshot.includes(snapshot.uid)) data.push(snapshot);
    });
    setPosts(data);
  };

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
      {Posts.map((post, idx) => {
        return (
          <Post
            key={idx}
            content={post.content}
            img={post.image}
            date={post.date}
            uid={post.uid}
          // user={user}
            likes={post.likes}
            comments={post.commentID}
          />
        );
      })}
    </Row>
  );
};

export default Feed;
