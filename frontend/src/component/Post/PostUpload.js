import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import FirebaseController from "../../firebase.js";

function PostUpload() {
  const { TextArea } = Input;
  const [status, setStatus] = useState("");

  const uploadPost = () => {
    let data = {
      content: status,
      date: new Date(),
      like: [],
      uid: FirebaseController.getCurrentUser().uid,
    };
    // console.log(data);
    FirebaseController.uploadPost(data);
    setStatus("");
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <Card title="Home">
        <TextArea
          placeholder="What's happening?"
          value={status}
          autoSize={{ minRows: 2 }}
          onChange={handleChange}
        />
        <Button
          type="primary"
          style={{ float: "right", marginTop: 15 }}
          onClick={uploadPost}
        >
          Upload
        </Button>
      </Card>
    </div>
  );
}

export default PostUpload;
