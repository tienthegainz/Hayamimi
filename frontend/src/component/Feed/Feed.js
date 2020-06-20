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
    const usersRef = await FirebaseController.db
      .collection('users')
      .get();
    const postsRef = await FirebaseController.db.collection('posts').orderBy('date', 'desc').get();

    const usersSnapshot = await usersRef.docs.map((doc) => ({ uid: doc.id, displayName: doc.data().displayName, avatarURL: doc.data().avatarURL }));
    const postsSnapshot = await postsRef.docs.map((doc) => doc.data());
    console.log(usersSnapshot)


    const data = [];
    postsSnapshot.forEach((snapshot) => {
      snapshot.displayName = usersSnapshot.find(e => (e.uid === snapshot.uid)).displayName;
      snapshot.avatarURL = usersSnapshot.find(e => (e.uid === snapshot.uid)).avatarURL;
      data.push(snapshot);
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
            displayName={post.displayName}
            avatar={post.avatarURL}
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
