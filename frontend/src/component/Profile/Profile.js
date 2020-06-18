import React, { useState, useEffect } from 'react';
import Post from "../Feed/Post.js";
import data from "../../fake_data.json";
import { Modal, Tabs, PageHeader, Row, Card, Avatar, Input, Button } from 'antd';
import {
  ScheduleOutlined,
  MailOutlined
} from '@ant-design/icons';
// import { withRouter } from 'react-router-dom';
import FirebaseController from '../../firebase.js'

import SetupProfile from './SetupProfile.js';
import './Profile.css';

const { TabPane } = Tabs;

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);

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
      if (followingsSnapshot.includes(snapshot.uid) && snapshot.uid === props.user.uid){
       data.push(snapshot);
      }
    });
    setPosts(data);
  };


  useEffect(() => {
    setUser(FirebaseController.getCurrentUser());
  }, []);

  const showModal = () => {
    if (!visible) setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  let isLoggedIn = props.isLoggedIn;


  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => props.history.push('/')}
        title={user.displayName}
        subTitle='0 tweet'
      >
       
      </PageHeader>

      <Row>
        <Card style={{ width: '100%' }}>
          <div className="setup-avatar">
            <div className="background-image"></div>
            <div className="avatar-image">
              <Avatar size={150} src={user.photoURL} />
            </div>

            <Button
              type="primary"
              shape="round"
              className="setup-profile"
              size="large"
              onClick={showModal}
            >
              Set Up Profile
            </Button>
            <Modal
              title="SetupProfile"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <SetupProfile user={user} />
            </Modal>
            <div className="information">
              <div className="my-name">{user.displayName}</div>
              <div>
                <MailOutlined /> {user.email}
              </div>
              <div>
                <ScheduleOutlined /> Joined January 2020
              </div>
            </div>
          </div>
        </Card>
      </Row>

      <Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tweets" key="1">
          {Posts.map((post, idx) => {
        return (
          <Post
            key={idx}
            content={post.content}
            img={post.image}
            date={post.date}
            uid={post.uid}
          // user={user}
          // comments={post.commentID}
          />
        );
      })}
          </TabPane>
          <TabPane tab="Following" key="2">
            This is all your Following here
         </TabPane>
          <TabPane tab="Followed" key="3">
            This is all your Followed here
         </TabPane>

        </Tabs>
      </Row>
    </div>
  );
};

export default Profile;
