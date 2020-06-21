import React, { useState, useEffect } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import FirebaseController from '../../firebase.js'

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea onChange={onChange} value={value} autoSize />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Comments = (props) => {

  console.log(props)

  const pid = props.pid;
  const [commentsID, setCommentsID] = useState(props.commentsID);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const avatar = localStorage.getItem('avatar');
  const displayName = localStorage.getItem('displayName');
  const uid = localStorage.getItem("uid");

  const CommentList = (
    <List
      className="comment-list"
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={item => (
        <li>
          <Comment
            author={item.displayName}
            avatar={item.avatarURL}
            content={item.content}
          // datetime={item.date}
          />
        </li>
      )}
    />
  );

  useEffect(() => {
    getComment();
  }, [commentsID]);

  const getComment = async () => {
    console.log("Get Comment of ", pid);
    const usersRef = await FirebaseController.db
      .collection('users')
      .get();

    const commentsRef = await FirebaseController.db.collection('comments').where('pid', '==', props.pid).get();

    const usersSnapshot = await usersRef.docs.map((doc) => ({ uid: doc.data().uid, displayName: doc.data().displayName, avatarURL: doc.data().avatarURL }));

    const commentsSnapshot = commentsRef.docs.map((doc) => ({
      pid: doc.id, uid: doc.data().uid, content: doc.data().content,
      date: doc.data().date.toDate()
    }));
    console.log('CmtSnap:', commentsSnapshot);
    let data = [];

    commentsSnapshot.forEach((snapshot) => {
      snapshot.displayName = usersSnapshot.find(e => (e.uid === snapshot.uid)).displayName;
      snapshot.avatarURL = usersSnapshot.find(e => (e.uid === snapshot.uid)).avatarURL;
      data.push(snapshot);
      console.log(data);
    });
    setComments(data);
  };

  const handleSubmit = async () => {
    if (!value) {
      return;
    }
    let push_data = {
      pid: pid,
      uid: uid,
      content: value,
      date: new Date(),
    };

    // Add comments
    FirebaseController.db
      .collection("comments")
      .add(push_data)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        setCommentsID([...commentsID, ref.id])
        FirebaseController.db
          .collection("posts")
          .doc(pid).update({
            commentID: [...commentsID, ref.id]
          })
      });

    let comment_data = {
      pid: pid,
      uid: uid,
      content: value,
      date: new Date(),
      displayName: displayName,
      avatarURL: avatar
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');

      setComments([
        ...comments,
        comment_data
      ]);

    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {(commentsID.length > 0) ? CommentList : <div></div>}
      <Comment
        avatar={
          <Avatar
            src={avatar}
            alt={displayName}
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default Comments;
