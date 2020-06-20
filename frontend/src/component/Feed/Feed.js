import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import UploadPost from './UploadPost';
import Post from './Post';
import FirebaseController from '../../firebase.js';

const Feed = () => {
  const [Posts, setPosts] = useState([]);
  const currentUID = localStorage.getItem('uid');

  useEffect(() => {
    getPosts();

  }, []);

  const getPosts = async () => {
    const usersRef = await FirebaseController.db
      .collection('users')
      .get();
    const postsRef = await FirebaseController.db.collection('posts').orderBy('date', 'desc').get();

    const usersSnapshot = await usersRef.docs.map((doc) => ({ uid: doc.id, displayName: doc.data().displayName, avatarURL: doc.data().avatarURL }));
    const postsSnapshot = await postsRef.docs.map((doc) => ({
      pid: doc.id, uid: doc.data().uid, content: doc.data().content,
      date: doc.data().date, image: doc.data().image, like: doc.data().like, commentID: doc.data().commentID
    }));


    const data = [];
    postsSnapshot.forEach((snapshot) => {
      snapshot.displayName = usersSnapshot.find(e => (e.uid === snapshot.uid)).displayName;
      snapshot.avatarURL = usersSnapshot.find(e => (e.uid === snapshot.uid)).avatarURL;
      data.push(snapshot);
    });
    setPosts(data);
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
            pid={post.pid}
            displayName={post.displayName}
            avatar={post.avatarURL}
            permission={permission}
            comments={post.commentID}
          />
        );
      })}
    </Row>
  );
};

export default Feed;
