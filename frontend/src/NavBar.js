import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  NotificationOutlined,
  MessageOutlined
} from '@ant-design/icons';

const NavBar = () => {
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
      <Menu.Item key="sub3" icon={<MessageOutlined />}>
        Messages
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
