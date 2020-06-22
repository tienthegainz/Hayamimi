import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Table, Radio, Divider, Button } from "antd";
import FirebaseController from "../../firebase.js";
import { withRouter } from "react-router-dom";

const UserTable = (props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  // const usersRef = FirebaseController.db.collection('users').get();

  // let userData = FirebaseController.getAllUserData();
  // const data = userData;
  // data.push(
  //   {
  //     name: "name",
  //     email: "mail",
  //     isAdmin: "false",
  //   }
  // )
  // for (let i = 0; i < userData.length; i++) {
  //   data.push({
  //     name: userData[i].displayName,
  //     email: userData[i].avatarURL,
  //     isAdmin: userData[i].isAdmin,
  //   });
  // }

  // const start = () => {
  //   this.setState({ loading: true });
  // setTimeout(() => {
  //   this.setState({
  //     selectedRowKeys: [],
  //     loading: false,
  //   });
  // }, 1000);
  // };
  // const onSelectChange = selectedRowKeys => {
  //   this.setState({ selectedRowKeys });
  // };
  // const { loading, selectedRowKeys } = this.state;
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: this.onSelectChange,
  // };
  // const hasSelected = selectedRowKeys.length > 0;

  return (
    <Col span={24}>
      <div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
          </span>
        </div>
        {/* <Table columns={columns} dataSource={data} bordered /> */}
      </div>
    </Col>
  );
};

export default UserTable;
