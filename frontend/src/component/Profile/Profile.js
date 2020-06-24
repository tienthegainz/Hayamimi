import React, { useState, useEffect } from "react";
import { Modal, PageHeader, Card, Avatar, Button } from "antd";

import FirebaseController from "../../firebase.js";
import Feed from "../Feed/Feed.js";
import SetupProfile from "./SetupProfile.js";
import "./Profile.css";
import { MailOutlined, CalendarOutlined } from "@ant-design/icons";

const Profile = (props) => {
  const [displayName, setDisplayName] = useState();
  const [avatar, setAvatar] = useState();
  const [background, setBackground] = useState();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState();
  const [dateJoined, setDateJoined] = useState();
  const [follow, setFollow] = useState((localStorage.getItem("following").includes(props.match.params.uid)) ? true : false)
  const currentUid = localStorage.getItem("uid");
  const isCurrentUser = props.match.params.uid === currentUid ? true : false;

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

  const handleFollow = async () => {
    let new_following = JSON.parse(localStorage.getItem("following"));
    if (!follow) {
      new_following.push(props.match.params.uid);
      setFollow(true);
    }
    else {
      new_following = new_following.filter((value) => (value !== props.match.params.uid));
      setFollow(false);
    }
    localStorage.setItem('following', JSON.stringify(new_following));
    await FirebaseController.db.collection("users").doc(currentUid).update({
      following: new_following
    })
  }

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
              <Button
                type={(follow) ? "ghost" : "primary"}
                shape="round"
                className="setup-profile"
                size="large"
                onClick={handleFollow}
              >
                {(follow) ? "Following" : "Follow"}
              </Button>
            )}

          <div className="information">
            <div className="my-name">{displayName}</div>
            <div>
              <MailOutlined /> {email}
              <br />
              <CalendarOutlined />  {"Joined since " + dateJoined}
            </div>
          </div>
        </div>
      </Card>
      <Feed type="profile" uid={props.match.params.uid} />
    </div>
  );
};

export default Profile;
