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

    const postsRef = await FirebaseController.db.collection('posts').get();
    const postsSnapshot = postsRef.docs.map((doc) => doc.data());

    const data = [];
    postsSnapshot.forEach((snapshot) => {
      if (followingsSnapshot.includes(snapshot.uid)) data.push(snapshot);
    });
    setPosts(data);
  };

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <UploadPost />
      </Col>
      {Posts.map((post, idx) => {
        return (
          <Post
            key={idx}
            content={post.content}
            img={post.image}
            date={post.date}
            // user={user}
            // comments={post.commentID}
          />
        );
      })}
    </Row>
  );
};

export default Feed;
