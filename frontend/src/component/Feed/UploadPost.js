import React, { useState } from 'react';
import { Card, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FirebaseController from '../../firebase.js';

const UploadPost = () => {
  const { TextArea } = Input;
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);

  const uploadPost = () => {
    let data = {
      content: status,
      date: new Date(),
      like: [],
      uid: FirebaseController.getCurrentUser().uid
    };
    // console.log(data);
    FirebaseController.uploadPost(data, image);
    setStatus('');
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onChange = (e) => {
    if (e.files) {
      setImage(e.files);
    }
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    setImageList(fileList);
  };

  const onRemove = (file) => {
    setImage(null);
  }

  return (
    <div>
      <Card title="Home">
        <TextArea
          placeholder="What's happening?"
          value={status}
          autoSize={{ minRows: 2 }}
          onChange={handleChange}
        />
        <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
          <Upload
            customRequest={dummyRequest}
            onChange={onChange}
            onRemove={onRemove}
            fileList={imageList}
          >
            <Button
              type="ghost"
              style={{ float: 'left', marginTop: 15 }}
              listType='picture'
              className='upload-list-inline'
            >
              <UploadOutlined /> Add Image
          </Button>
          </Upload>
          <Button
            type="primary"
            style={{ float: 'right', marginTop: 15 }}
            onClick={uploadPost}
          >
            Upload
        </Button>
        </div>
      </Card>
    </div >
  );
};

export default UploadPost;
