import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import NavBar from '../Bar/NavBar';
import Feed from '../Feed/Feed';

import FirebaseController from '../../firebase.js';
import { Switch, Route, withRouter } from 'react-router-dom';

import './Home.css';

const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);

  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
    if (isLoggedIn) console.log(FirebaseController.getCurrentUser());
    else {
      props.history.replace('/login');
    }
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
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route exact path="/notifications" component={Feed} />
          <Route exact path="/profile" component={Feed} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default withRouter(Home);
