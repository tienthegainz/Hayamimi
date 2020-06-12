import React, { useState } from "react";
import { Card, Input, Button } from "antd";

function PostUpload() {
  const { TextArea } = Input;

  return (
    <div>
      <Card title="Home">
        <TextArea placeholder="What's happening?" autoSize={{ minRows: 2 }} />
        <Button type="primary" style={{ float: "right", marginTop: 15 }}>
          Upload
        </Button>
      </Card>
    </div>
  );
}

export default PostUpload;
