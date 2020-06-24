import React from "react";
import { Tabs, Row } from "antd";
import Feed from "../Feed/Feed";
import UserTable from "./UserTable";
import { withRouter } from "react-router-dom";

const { TabPane } = Tabs;

const Manage = (props) => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    if (localStorage.getItem("isAdmin") === "false") props.history.push("/");
  } else props.history.push("/login");

  return (
    <Row>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Users" key="1">
          <UserTable />
        </TabPane>
        <TabPane tab="Posts" key="2">
          <Feed type="manage" />
        </TabPane>
        <TabPane tab="Analytics" key="3">
          On development
        </TabPane>
      </Tabs>
    </Row>
  );
};

export default withRouter(Manage);
