import React, { useState } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import FirebaseController from '../../firebase.js'


const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

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
  const { listComments } = props;

  const [comments, setComments] = useState(listComments);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  
 
  

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    let user = null;
    user = FirebaseController.getCurrentUser();
    setSubmitting(true);
     
    let data = {
      post_id: "b4ZN02bZHLPC9sE0MZGAe615HmC2",
      user_id: user.uid,
      content: value,
      date: new Date(),         
    };
      FirebaseController.uploadComment(data);
        

    setTimeout(() => {
    
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author : user.displayName ,
          avatar : user.photoURL,
          content: <p>{value}</p>
        }
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
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
