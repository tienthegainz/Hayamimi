import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import FirebaseController from "../../firebase.js";

const NavBar = (props) => {
  const [uid, setUID] = useState();
  const [displayName, setDisplayName] = useState();
  const [isAdmin, setIsAdmin] = useState();

  const handleLogOut = () => {
    FirebaseController.logout();
    props.history.push("/login");
  };

  useEffect(() => {
    FirebaseController.auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUID(user.uid);
        const userDoc = await FirebaseController.db
          .collection("users")
          .doc(user.uid)
          .get();
        const userData = userDoc.data();
        setDisplayName(userData.displayName);
        setIsAdmin(userData.isAdmin);
      }
    });
  }, []);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%" }}
    >
      <Menu.Item
        icon={<HomeOutlined />}
        onClick={() => props.history.push("/")}
      >
        Home
      </Menu.Item>
      <Menu.Item
        icon={<SearchOutlined />}
        onClick={() => props.history.push("/explore")}
      >
        Explore
      </Menu.Item>
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => props.history.push(`/user/${uid}`)}
      >
        {displayName}
      </Menu.Item>
      {isAdmin && (
        <Menu.Item
          icon={<TeamOutlined />}
          onClick={() => props.history.push(`/manage`)}
        >
          Manage
        </Menu.Item>
      )}
      <Menu.Item icon={<LogoutOutlined />} onClick={handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(NavBar);
