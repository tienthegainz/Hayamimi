import React, { useState, useEffect } from "react";
import { Modal, Tabs, PageHeader, Card, Avatar, Button } from "antd";

import FirebaseController from "../../firebase.js";
import Feed from "../Feed/Feed.js";
import SetupProfile from "./SetupProfile.js";
import "./Profile.css";
import { MailOutlined, CalendarOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Profile = (props) => {
  const [displayName, setDisplayName] = useState();
  const [avatar, setAvatar] = useState();
  const [background, setBackground] = useState();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState();
  const [dateJoined, setDateJoined] = useState();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const urlUid = props.match.params.uid;
    const userRef = await FirebaseController.db
      .collection("users")
      .where("uid", "==", urlUid)
      .limit(1)
      .get();
    const userSnapshot = await userRef.docs.map((doc) => doc.data());
    // console.log(userSnapshot);
    setDisplayName(userSnapshot[0].displayName);
    setAvatar(userSnapshot[0].avatarURL);
    setBackground(userSnapshot[0].backgroundURL);
    let date = userSnapshot[0].dateJoined.toDate()
    setDateJoined(new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date));
    setEmail(userSnapshot[0].email);
  };
  const showModal = () => {
    if (!visible) setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUid, setCurrentUid] = useState();
  function handleLoggedIn() {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
    }
  }

  function handleLoggedOut() {
    if (isLoggedIn) {
      FirebaseController.logout();
      setIsLoggedIn(false);
    }
  }
  FirebaseController.auth.onAuthStateChanged(function (user) {
    if (user) {
      setIsLoggedIn(true);
      setCurrentUid(user.uid);
    }
  });

  const isCurrentUser = props.match.params.uid === currentUid ? true : false;

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => props.history.push("/")}
        title={displayName}
      ></PageHeader>

      <Card style={{ width: "100%" }}>
        <div className="setup-avatar">
          <div className="background-image">
            {" "}
            <img src={background} />{" "}
          </div>
          <div className="avatar-image">
            <Avatar size={150} src={avatar} />
          </div>
          {isCurrentUser ? (
            <div>
              <Button
                type="primary"
                shape="round"
                className="setup-profile"
                size="large"
                onClick={showModal}
              >
                Set Up Profile
              </Button>
              <Modal
                title="SetupProfile"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <SetupProfile
                  avatar={avatar}
                  displayName={displayName}
                  background={background}
                  email={email}
                  dateJoined={dateJoined}
                />
              </Modal>
            </div>
          ) : (
              <div></div>
            )}

          <div className="information">
            <div className="my-name">{displayName}</div>
            <div>
              <MailOutlined /> {email}
              <br />
              <CalendarOutlined />  {dateJoined}
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Tweets" key="1">
          <Feed type="profile" uid={props.match.params.uid} />
        </TabPane>
        <TabPane tab="Following" key="2">
          On development
        </TabPane>
        <TabPane tab="Followed" key="3">
          On development
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
