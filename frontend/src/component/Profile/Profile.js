import React, { useState, useEffect } from 'react';
import { Modal, Tabs, PageHeader, Row, Card, Avatar, Input, Button } from 'antd';

import FirebaseController from '../../firebase.js';
import Feed from "../Feed/Feed.js";
import SetupProfile from './SetupProfile.js';
import './Profile.css';

const { TabPane } = Tabs;

const Profile = (props) => {
  const displayName = localStorage.getItem('displayName');
  const avatar = localStorage.getItem('avatar');
  const background = localStorage.getItem('background');
  const [visible, setVisible] = useState(false);
  const [Posts, setPosts] = useState([]);

  console.log(props.match.params.uid);

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
      Profile
      <PageHeader
        ghost={false}
        onBack={() => props.history.push('/')}
        title={displayName}
        subTitle='0 tweet'
      >

      </PageHeader>

      <Row>
        <Card style={{ width: '100%' }}>
          <div className="setup-avatar">
            <div className="background-image"> <img src={background} /> </div>
            <div className="avatar-image">
              <Avatar size={150} src={avatar} />
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
              <SetupProfile />
            </Modal>
            <div className="information">
              <div className="my-name">{displayName}</div>
            </div>
          </div>
        </Card>
      </Row>

      <Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tweets" key="1">
            < Feed />
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
