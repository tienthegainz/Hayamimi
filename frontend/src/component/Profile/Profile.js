import React from 'react';
import { Layout, Row, Col } from 'antd';
import NavBar from '../Bar/NavBar';
import SideBar from '../Bar/SideBar';
import SubProfile from './SubProfile';
import FirebaseController from '../../firebase.js'
import { withRouter } from 'react-router-dom'


function Profile(props){
  var isLoggedIn = props.isLoggedIn;

  // if (isLoggedIn) {
  //   console.log(FirebaseController.getCurrentUser())
  // } else {
  //   props.history.replace('/login')
  //   return null
  // }
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

            <SubProfile />

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

export default withRouter(Profile);