import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from '../Bar/NavBar';
import SideBar from '../Bar/SideBar';
import Feed from '../Feed/Feed';
import Profile from '../Profile/Profile';

import './Home.css';

const Home = (props) => {

  if (localStorage.getItem('isLoggedIn') === 'false' || localStorage.getItem('isLoggedIn') === null) props.history.push('/login');


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
              <Route exact path="/" render={() => <Feed type='home' />} />
              <Route exact path="/user/:uid" component={Profile} />
            </Switch>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default withRouter(Home);
