import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from '../Bar/NavBar';
import SideBar from '../Bar/SideBar';
import Feed from '../Feed/Feed';
import Profile from '../Profile/Profile';

import './Home.css';

const Home = (props) => {
  useEffect(() => {
    if (!props.isLoggedIn) props.history.replace('/login');
  });

  const { Content, Sider } = Layout;

  return (
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
        <NavBar logout={props.logout} />
      </Sider>

      <Content style={{ margin: '24px 24px 0 224px' }}>
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route exact path="/notifications" component={Feed} />
              <Route exact path="/profile/:uid" component={Profile} />
            </Switch>
          </Col>

          <Col span={8}>
            <Row gutter={[0, 24]}>
              <SideBar />
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default withRouter(Home);
