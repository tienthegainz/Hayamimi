import React from 'react';
import { Col, Card } from 'antd';
import FirebaseController from '../../firebase.js';



const SideBar = () => {
  let uids = [];
  let users = [];
  uids = FirebaseController.getAllUid();
  users = FirebaseController.getAllUserData();
  console.log(users);

  return (
    <>
      <Col span={24}>
        <Card title="Trending" />
      </Col>
      <Col span={24}>
        <Card title="Suggestion" />
      </Col>
    </>
  );
};

export default SideBar;
