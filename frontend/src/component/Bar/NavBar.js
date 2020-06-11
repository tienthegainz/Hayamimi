import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  NotificationOutlined,
  LogoutOutlined,
  UserOutlined 
} from '@ant-design/icons';

function NavBar(props) {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
    >
      <Menu.Item key="sub1" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="sub2" icon={<NotificationOutlined />}>
        Notifications
      </Menu.Item>
      <Menu.Item key="sub3" icon={<UserOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Item key="sub4" icon={<LogoutOutlined />} onClick={props.logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
