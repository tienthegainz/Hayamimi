import React from 'react';
import Post from "../Feed/Post.js";
import data from "../../fake_data.json";
import { Modal, Tabs, PageHeader, Layout, Row, Card, Avatar, Input, Button } from 'antd';
import {
  UserOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
// import { withRouter } from 'react-router-dom';
import "./profile.css";
import FirebaseController from '../../firebase.js'

import SetupProfile from './SetupProfile.js';
import { useState } from "react";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Profile = (props) => {

  const [visible, setVisible] = useState(false)
  
  function showModal(){  
    if(!visible){
      setVisible(true); 
    }  
    
  };
  
  function handleOk(e){
    console.log(e);   
    setVisible(false);  
  };
  
  function handleCancel(e){
    console.log(e);
    setVisible(false);
  };
  let user = null;

  let isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    user = FirebaseController.getCurrentUser();
    console.log(FirebaseController.getCurrentUser())
  } else {
    props.history.replace('/login')
    return null
  }
  
  const { Meta } = Card;
  const { TextArea } = Input;
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title={user.displayName}
        subTitle="0 Tweet"
      />

      <Row>
        <div className="setup-avatar">
          <div className="background-image">

          </div>
          <div className="avatar-image">
            <Avatar size={150} src={user.photoURL} />
          </div>
          
          <Button type="primary" shape="round" className="setup-profile" size="large" onClick={showModal}>
            Set Up Profile
          </Button>
          <Modal 
            title="SetupProfile"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <SetupProfile  user = {user} isLoggedIn = { isLoggedIn }/>
          </Modal>
          <div className="information">
            <div className="my-name">{user.displayName}</div>
            <div>@{user.displayName}{user.uid}</div>
            <div><ScheduleOutlined /> Joined January 2020</div>

          </div>
        </div>

      </Row>

      <Row>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tweets" key="1">
          {data.posts.map((post, idx) => {
            const user = data.users.find((user) => user.id === post.user_id);
            let comments = data.comments.filter((cmts) => cmts.post_id === post.id);
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
