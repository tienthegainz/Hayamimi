import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import UploadPost from "./UploadPost";
import Post from "./Post";
import FirebaseController from "../../firebase.js";

const Feed = (props) => {
  const [Posts, setPosts] = useState([]);
  const currentUID = localStorage.getItem("uid");
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const postsRef =
      props.type === "profile"
        ? await FirebaseController.db
          .collection("posts")
          .where("uid", "==", props.uid)
          .orderBy("date", "desc")
          .get()
        : await FirebaseController.db
          .collection("posts")
          .orderBy("date", "desc")
          .get();

    let postsSnapshot = postsRef.docs.map((doc) => ({
      pid: doc.id,
      uid: doc.data().uid,
      content: doc.data().content,
      date: doc.data().date.toDate(),
      image: doc.data().image,
      likes: doc.data().like,
      commentID: doc.data().commentID
    }));

    const usersOnPost = postsRef.docs.map((doc) => doc.data().uid);
    if (usersOnPost === undefined || usersOnPost.length === 0) return;

    const usersRef = await FirebaseController.db
      .collection("users")
      .where("uid", "in", usersOnPost)
      .get();

    const usersSnapshot = usersRef.docs.map((doc) => ({
      uid: doc.id,
      displayName: doc.data().displayName,
      avatarURL: doc.data().avatarURL
    }));

    const usersUID = usersRef.docs.map((doc) => (doc.id))
    postsSnapshot = postsSnapshot.filter((post) => usersUID.includes(post.uid))

    const data = [];
    postsSnapshot.forEach((snapshot) => {
      snapshot.displayName = usersSnapshot.find(
        (e) => e.uid === snapshot.uid
      ).displayName;
      snapshot.avatarURL = usersSnapshot.find(
        (e) => e.uid === snapshot.uid
      ).avatarURL;
      data.push(snapshot);
    });
    setPosts(data);
  };

  return (
    <Row gutter={[0, 24]}>
      {(props.type === "home" || currentUID === props.uid) && (
        <Col span={24}>
          <UploadPost />
        </Col>
      )}

      {Posts.filter((post) => post.content.indexOf(props.search || '') > -1).map(
        (post, idx) => {
          const permission = post.uid === currentUID || isAdmin ? true : false;
          const date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          }).format(post.date);
          return (
            <Post
              key={idx}
              content={post.content}
              img={post.image}
              likes={post.likes}
              date={date}
              uid={post.uid}
              pid={post.pid}
              displayName={post.displayName}
              avatar={post.avatarURL}
              permission={permission}
              commentsID={post.commentID}
            />
          );
        }
      )}
    </Row>
  );
};

export default Feed;
