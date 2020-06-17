import React, { useState, useEffect } from 'react';
import { Modal, Tabs, PageHeader, Row, Avatar, Button, Card } from 'antd';
import { ScheduleOutlined, MailOutlined } from '@ant-design/icons';
import FirebaseController from '../../firebase.js';
import data from '../../fake_data.json';
import Post from '../Feed/Post.js';
import SetupProfile from './SetupProfile.js';
import './Profile.css';

const { TabPane } = Tabs;

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);

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

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => props.history.push('/')}
        title={user.displayName}
        subTitle="0 Tweet"
      />

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
            {data.posts.map((post, idx) => {
              const user = data.users.find((user) => user.id === post.user_id);
              let comments = data.comments.filter(
                (cmts) => cmts.post_id === post.id
              );
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
          </TabPane>
          <TabPane tab="Following" key="2">
            This is all your following here
          </TabPane>
          <TabPane tab="Followers" key="3">
            This is all your followers here
          </TabPane>
        </Tabs>
      </Row>
    </div>
  );
};

export default Profile;
