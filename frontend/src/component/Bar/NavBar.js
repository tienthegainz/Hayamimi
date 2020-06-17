import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BellOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { withRouter, Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
    >
      <Menu.Item key="sub1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="sub2" icon={<BellOutlined />}>
        <Link to="/notifications">Notifications</Link>
      </Menu.Item>
      <Menu.Item key="sub3" icon={<UserOutlined />}>
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="sub4" icon={<LogoutOutlined />} onClick={props.logout}>
        Log Out
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(NavBar);
