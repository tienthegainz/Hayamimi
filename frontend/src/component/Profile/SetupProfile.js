import React, { useState } from 'react';

import {
  Button,
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
  MailOutlined,
  CalendarOutlined,
  InfoOutlined,
  UserOutlined,
  UploadOutlined
} from '@ant-design/icons';

const SetupProfile = (props) => {
  const { displayName, avatar, background, email, dateJoined } = props;
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [image, setImage] = useState('');
  const [newAvatar, setNewAvatar] = useState();
  const [newBackground, setNewBackground] = useState();
  const uid = FirebaseController.auth.currentUser.uid;

  var metadata = {
    contentType: 'image/jpeg'
  }

  const showModal1 = () => {
    setVisible1(true);
  };
  const showModal2 = () => {
    setVisible2(true);
  };
  const showModal3 = () => {
    setVisible3(true);
  };

  const handleOkAvatar = (e) => {
    uploadAvatar();
    setVisible1(false);
  };
  const handleOkBackground = (e) => {
    uploadBackground();
    setVisible2(false);
  };
  const handleOkInfo = (e) => {
    setVisible3(false);
  };

  const handleCancel1 = (e) => {
    setVisible1(false);
  };
  const handleCancel2 = (e) => {
    setVisible2(false);
  };
  const handleCancel3 = (e) => {
    setVisible3(false);
  };

  const uploadAvatar = () => {
    if (image) {
      FirebaseController.storage
        .ref(`avatar/users/${uid}`)
        .put(image.originFileObj, metadata)
        .then(snap => {
          snap.ref.getDownloadURL().then(downloadURL => {
            setNewAvatar(downloadURL);
            handleChangeAvatar(downloadURL);
          })
        })
    }
  }

  const handleChangeAvatar = async (url) => {
    FirebaseController.db.collection("users").doc(uid).update({
      avatarURL: url
    })
  }

  const uploadBackground = () => {
    if (image) {
      FirebaseController.storage
        .ref(`background/users/${uid}`)
        .put(image.originFileObj, metadata)
        .then(snap => {
          snap.ref.getDownloadURL().then(downloadURL => {
            setNewBackground(downloadURL);
            handleChangeBackground(downloadURL);
          })
        })
    }
  }

  const handleChangeBackground = async (url) => {
    FirebaseController.db.collection("users").doc(uid).update({
      backgroundURL: url
    })
  }


  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const onChange = (e) => {
    if (e.file) {
      setImage(e.file);
    }
  };

  const onRemove = (file) => {
    setImage(null);
  };


  return (
    <div>
      <div>
        Have a favorite Selfie? Upload and set avatar now!
      <Button
          type="link"
          onClick={showModal1}
        >
          upload
      </Button>
        <Modal
          title="Upload your avatar"
          visible={visible1}
          onOk={handleOkAvatar}
          onCancel={handleCancel1}
          style={{ height: '500px' }}
        >
          <div className="avatar-image-header">


            <Upload
              customRequest={dummyRequest}
              onChange={onChange}
              onRemove={onRemove}
            >
              <Button type="primary">
                <UploadOutlined /> Add avatar
          </Button>
            </Upload>
            <Avatar size={150} src={newAvatar} />
          </div>
        </Modal>
        <div className="avatar-image-header">
          <Avatar size={150} src={avatar} />

        </div>
      </div>
      <div>
        Upload and change your background now!
      <Button
          type="link"
          onClick={showModal2}
        >
          upload
      </Button>
        <Modal
          title="Upload your background"
          visible={visible2}
          onOk={handleOkBackground}
          onCancel={handleCancel2}

        >
          <Upload
            customRequest={dummyRequest}
            onChange={onChange}
            onRemove={onRemove}
          >
            <Button type="primary">
              <UploadOutlined /> Add background
          </Button>
          </Upload>
          <img src={newBackground} />

        </Modal>
        <div className="background-image">
          <img src={background} />
        </div>
      </div>

      <div>
        Want to edit your information? Let check it now!
      <Button
          type="link"
          onClick={showModal3}
        >
          upload
      </Button>
        <Modal
          title="Change you information"
          visible={visible3}
          onOk={handleOkInfo}
          onCancel={handleCancel3}
        >
          <Input
            onChange={(e) =>
              FirebaseController.handleChangeName(e.target.value)
            }
            placeholder="Enter your new Name"
            prefix={<UserOutlined />}
            suffix={
              <Tooltip title="Name must be under 25 characters">
                <InfoOutlined />
              </Tooltip>
            } />
        </Modal>
        <div className="information2">
          <div className="my-name">{displayName}</div>
          <div><MailOutlined /> {email}
            <br />
            <CalendarOutlined />
          </div>
        </div>
      </div>
    </div>
  );

}



export default withRouter(SetupProfile);
