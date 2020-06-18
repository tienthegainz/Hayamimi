import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import UploadPost from './UploadPost';
import Post from './Post';
import FirebaseController from '../../firebase.js';

const Feed = () => {
  const [Posts, setPosts] = useState([]);
  const [currentUID, setCurrentUID] = useState(null);

  useEffect(() => {
    getPosts();
    getCurrentUID();
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

  const getCurrentUID = async () => {
    FirebaseController.auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUID(user.uid);
      }
    });
  };

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <UploadPost />
      </Col>
      {Posts.map((post, idx) => {
        const permission = (post.uid === currentUID) ? true : false;
        return (
          <Post
            key={idx}
            content={post.content}
            img={post.image}
            date={post.date}
            uid={post.uid}
            permission={permission}
          // user={user}
          // comments={post.commentID}
          />
        );
      })}
    </Row>
  );
};

export default Feed;
