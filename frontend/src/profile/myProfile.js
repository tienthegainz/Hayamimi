import React from 'react';
import { Layout, Row, Col } from 'antd';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Profile from './Profile';

import './profile.css';

const myProfile = () => {
    const { Content, Sider } = Layout;

    return(
        <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <NavBar />
      </Sider>



      

      <Content style={{ margin: '24px 24px 0 224px' }}>
        <Row gutter={[24, 24]}>
          <Col span={16}>
            
              <Profile />
            
          </Col>

          <Col span={8}>
            <Row gutter={[0, 24]}>
              <SideBar />
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
    )
}

export default myProfile;