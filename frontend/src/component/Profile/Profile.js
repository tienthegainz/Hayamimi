import React, { useState, useEffect } from 'react';
import { Modal, Tabs, PageHeader, Row, Card, Avatar, Input, Button } from 'antd';

import FirebaseController from '../../firebase.js';
import Feed from "../Feed/Feed.js";
import SetupProfile from './SetupProfile.js';
import './Profile.css';

const { TabPane } = Tabs;

const Profile = (props) => {
  const [displayName, setDisplayName] = useState();
  const [avatar, setAvatar] = useState();
  const [background, setBackground] = useState();
  const [visible, setVisible] = useState(false);
  const [Posts, setPosts] = useState([]);
  const isCurrentUser = (props.match.params.uid === localStorage.getItem('uid')) ? true : false;


  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const urlUid = props.match.params.uid;
    const userRef = await FirebaseController.db.collection('users').where('uid', '==', urlUid).limit(1).get();
    const userSnapshot = await userRef.docs.map((doc) => (doc.data()));
    // console.log(userSnapshot);
    setDisplayName(userSnapshot[0].displayName);
    setAvatar(userSnapshot[0].avatarURL);
    setBackground(userSnapshot[0].backgroundURL);
  }

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
        title={displayName}
      >

      </PageHeader>

      <Row>
        <Card style={{ width: '100%' }}>
          <div className="setup-avatar">
            <div className="background-image"> <img src={background} /> </div>
            <div className="avatar-image">
              <Avatar size={150} src={avatar} />
            </div>
            {
              (isCurrentUser) ?
                <div><Button
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
                    {/* <SetupProfile /> */}
                  Setup here
                </Modal></div> :
                <div></div>
            }

            <div className="information">
              <div className="my-name">{displayName}</div>
            </div>
          </div>
        </Card>
      </Row>

      <Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tweets" key="1">
            < Feed type='profile' uid={props.match.params.uid} />
          </TabPane>
          <TabPane tab="Following" key="2">
            On development
         </TabPane>
          <TabPane tab="Followed" key="3">
            On development
         </TabPane>

        </Tabs>
      </Row>
    </div>
  );
};

export default Profile;
