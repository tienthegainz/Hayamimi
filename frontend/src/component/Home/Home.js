import React from "react";
import { Layout, Row, Col } from "antd";
import { Switch, Route, withRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Explore from "../Explore/Explore";
import Feed from "../Feed/Feed";
import Profile from "../Profile/Profile";

import "./Home.css";
import Manage from "../Manage/Manage";

const Home = (props) => {
  if (
    localStorage.getItem("isLoggedIn") === "false" ||
    localStorage.getItem("isLoggedIn") === null
  )
    props.history.push("/login");

  const { Content, Sider } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}
      >
        <NavBar />
      </Sider>

      <Content style={{ margin: "24px 24px 0 224px" }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Switch>
              <Route exact path="/" render={() => <Feed type="home" />} />
              <Route exact path="/user/:uid" component={Profile} />
              <Route exact path="/manage" render={() => <Manage />} />
              <Route exact path="/explore" component={Explore} />
            </Switch>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default withRouter(Home);