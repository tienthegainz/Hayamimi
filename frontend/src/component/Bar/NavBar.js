import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BellOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import FirebaseController from '../../firebase.js';

function NavBar(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(FirebaseController.getCurrentUser());
  }, []);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
    >
      <Menu.Item key="sub1" icon={<HomeOutlined />} onClick={() => props.history.push("/")}>
        Home
      </Menu.Item>
      <Menu.Item key="sub2" icon={<BellOutlined />} onClick={() => props.history.push("/notifications")}>
        Notifications
      </Menu.Item>
      <Menu.Item key="sub3" icon={<UserOutlined />} onClick={() => props.history.push(`/user/${user.uid}`)}>
        My Profile
      </Menu.Item>
      <Menu.Item key="sub4" icon={<LogoutOutlined />} onClick={props.logout}>
        Log Out
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(NavBar);
