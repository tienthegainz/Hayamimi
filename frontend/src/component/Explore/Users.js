import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
import FirebaseController from "../../firebase.js";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Users = (props) => {
  const [User, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const usersRef = await FirebaseController.db.collection("users").get();
    const usersSnapshot = usersRef.docs.map((doc) => ({
      uid: doc.id,
      displayName: doc.data().displayName,
      avatarURL: doc.data().avatarURL
    }));
    setUser(usersSnapshot);
  };

  return (
    <div>
      {User &&
        User.filter((user) => user.displayName.indexOf(props.search) > -1).map(
          (user, idx) => {
            return (
              <Card key={idx}>
                <Meta
                  avatar={<Avatar src={user.avatarURL} />}
                  title={
                    <Link to={`/user/${user.uid}`}>{user.displayName}</Link>
                  }
                />
              </Card>
            );
          }
        )}
    </div>
  );
};

export default Users;
