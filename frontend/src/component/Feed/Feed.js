import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import UploadPost from "./UploadPost";
import Post from "./Post";
import FirebaseController from "../../firebase.js";

const Feed = (props) => {
  const [Posts, setPosts] = useState([]);
  const [usersOnPost, setUsersOnPost] = useState([]);
  const currentUID = localStorage.getItem("uid");
  const type = props.type;
  const urlUid = props.uid;
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(async () => {
    const postsRef =
      type == "profile"
        ? await FirebaseController.db
          .collection("posts")
          .where("uid", "==", urlUid)
          .orderBy("date", "desc")
        : type == "search"
          ? await FirebaseController.db
            .collection("posts")
            .orderBy("date", "desc")
          : await FirebaseController.db
            .collection("posts")
            .orderBy("date", "desc");



    const unsubscribe = postsRef.onSnapshot(async (snapshot) => {
      let changes = snapshot.docChanges();
      let postsSnapshot = Posts;
      changes.forEach((change) => {
        console.log('Snapshot')
        if (change.type == 'added') {
          postsSnapshot.unshift({
            pid: change.doc.id,
            uid: change.doc.data().uid,
            content: change.doc.data().content,
            date: change.doc.data().date.toDate(),
            image: change.doc.data().image,
            likes: change.doc.data().like,
            commentID: change.doc.data().commentID,
          });

          if (!usersOnPost.includes(change.doc.data().uid)) {
            let a = usersOnPost;
            a.push(change.doc.data().uid);
            setUsersOnPost(a);
          }
        } else if (change.type == 'removed') {
          console.log('Delete trigger');
          setPosts(Posts.filter(el => el.pid === change.doc.id));
        }
      });

      const usersRef = await FirebaseController.db
        .collection("users")
        .where("uid", "in", usersOnPost)
        .get();

      const usersSnapshot = usersRef.docs.map((doc) => ({
        uid: doc.id,
        displayName: doc.data().displayName,
        avatarURL: doc.data().avatarURL,
      }));

      const data = [];
      console.log('Update: ', postsSnapshot.length);
      postsSnapshot.forEach((record) => {
        // console.log(record);
        record.displayName = usersSnapshot.find(
          (e) => e.uid === record.uid
        ).displayName;
        record.avatarURL = usersSnapshot.find(
          (e) => e.uid === record.uid
        ).avatarURL;
        data.push(record);
      });
      data.sort((a, b) => (a.date < b.date) ? 1 : -1);
      setPosts(data);

    });
    //remember to unsubscribe from your realtime listener on umount or you will create a memory leak
    return () => unsubscribe();
  }, [type]);

  // useEffect(() => {
  //   getPosts();
  // }, []);

  const getPosts = async () => {
    const postsRef =
      type == "profile"
        ? await FirebaseController.db
          .collection("posts")
          .where("uid", "==", urlUid)
          .orderBy("date", "desc")
          .get()
        : type == "search"
          ? await FirebaseController.db
            .collection("posts")
            .orderBy("date", "desc")
            .get()
          : await FirebaseController.db
            .collection("posts")
            .orderBy("date", "desc")
            .get();

    const postsSnapshot = postsRef.docs.map((doc) => ({
      pid: doc.id,
      uid: doc.data().uid,
      content: doc.data().content,
      date: doc.data().date.toDate(),
      image: doc.data().image,
      likes: doc.data().like,
      commentID: doc.data().commentID,
    }));

    const usersOnPost = postsRef.docs.map((doc) => doc.data().uid);
    if (usersOnPost === undefined || usersOnPost.length == 0) return;

    const usersRef = await FirebaseController.db
      .collection("users")
      .where("uid", "in", usersOnPost)
      .get();

    const usersSnapshot = usersRef.docs.map((doc) => ({
      uid: doc.id,
      displayName: doc.data().displayName,
      avatarURL: doc.data().avatarURL,
    }));

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
      <Col span={24}>
        {type === "home" || currentUID === urlUid ? (
          <UploadPost />
        ) : (
            <div></div>
          )}
      </Col>
      {Posts.map((post, idx) => {
        const permission = post.uid === currentUID || isAdmin ? true : false;
        const date = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
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
      })}
    </Row>
  );
};

export default Feed;
