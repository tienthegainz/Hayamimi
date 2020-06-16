import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  NotificationOutlined,
  LogoutOutlined,
  UserOutlined 
} from '@ant-design/icons';
import FirebaseController from '../../firebase.js';
import { withRouter } from 'react-router-dom';

function NavBar(props) {
  var isLoggedIn = props.isLoggedIn;
  let users = null;
  if (isLoggedIn) {
    users = FirebaseController.getCurrentUser();
    console.log(FirebaseController.getCurrentUser())
  }

  let uid = users.uid;

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
    >
      <Menu.Item key="sub1" icon={<HomeOutlined />} onClick = {() => props.history.push("/")}>
        Home
      </Menu.Item>
      <Menu.Item key="sub2" icon={<NotificationOutlined />} onClick = {() => props.history.push("/notifications")}>
        Notifications
      </Menu.Item>
      <Menu.Item key="sub3" icon={<UserOutlined />} onClick={() => props.history.push(`/user/${uid}`)}>
        My Profile
      </Menu.Item>
      <Menu.Item key="sub4" icon={<LogoutOutlined />} onClick={props.logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(NavBar);
