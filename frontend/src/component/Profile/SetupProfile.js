import React, { useState, useEffect } from 'react';

import {
  Steps,
  Button,
  message,
  Avatar,
  Upload,
  Modal,
  Input,
  Tooltip
} from 'antd';
import FirebaseController from '../../firebase.js';
import { withRouter } from 'react-router-dom';
import './SetupProfile.css';

import {
  UserOutlined,
  LoadingOutlined,
  CameraOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Step } = Steps;



const SetupProfile = (props) => {
  const { displayName, avatar, background } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl ] = useState();

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image you upload must smaller than 2MB!');
    }
  
    return isJpgOrPng && isLt2M;
  }
  
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleChange = (info) => {
    if(info.file.status === 'uploading'){
      setLoading(true);
      return;
    }
    if(info.file.status === 'done'){
      getBase64(info.file.originFileObj ,(imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }


  }

  return (
    <div>
      Have a favorite Selfie? Upload and set avatar now!
      <div>
        <Avatar></Avatar>
      </div>
    </div>
  );

}



export default withRouter(SetupProfile);
