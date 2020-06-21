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

const NavBar = (props) => {
  const uid = localStorage.getItem('uid');
  const displayName = localStorage.getItem('displayName');

  const handleLogOut = () => {
    FirebaseController.logout();
    props.history.push('/login');
  }

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
      <Menu.Item key="sub2" icon={<UserOutlined />} onClick={() => props.history.push(`/user/${uid}`)}>
        {displayName}
      </Menu.Item>
      <Menu.Item key="sub3" icon={<LogoutOutlined />} onClick={handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(NavBar);
