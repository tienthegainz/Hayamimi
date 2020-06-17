import React, { Component } from 'react';
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

class SetupProfile extends Component {
  state = {
    displayName: '',
    photoURL: '',
    uid: '',
    loading: false,
    visible: false
  };

  componentDidMount() {
    if (this.props.user !== null) {
      this.setState({
        displayName: this.props.user.displayName,
        photoURL: this.props.user.photoURL,
        uid: this.props.user.uid
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  };

  handleChange = (infor) => {
    if (infor.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (infor.file.status === 'done') {
      getBase64(infor.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <CameraOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const { current } = this.state;

    const steps = [
      {
        title: 'Pick a profile picture',
        content: (
          <div>
            Have a favorite selfie? Upload now.
            <div>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-upload"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>

              {FirebaseController.setupProfile(
                this.state.displayName,
                imageUrl
              )}
            </div>
          </div>
        )
      },
      {
        title: 'Pick a Header',
        content: (
          <div>
            People who visit your Tweet will see it. Show your Style.
            <div className="background-image">
              {/* <Upload 
            name="background"
            listType="picture"
            className="background-upload"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
        >{backgroundUrl ? <img src={backgroundUrl} alt="avatar" style={{width: '100%'}} /> : uploadButton}
        </Upload> */}
            </div>
            <div className="avatar-image-header">
              <Avatar size={150} src={imageUrl} />
            </div>
            <div className="information2">
              <div className="name">{this.state.displayName}</div>@
              {this.state.displayName}
              {this.state.uid}
              <Button type="primary" onClick={this.showModal}>
                Change your Display Name
              </Button>
              <Modal
                title="changeDisplayName"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Input
                  value={this.state.displayName}
                  name="displayName"
                  onChange={(e) =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="Enter your username"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Your display name can only contain letters, number and '_'">
                      <InfoCircleOutlined
                        style={{ color: 'rgba(0,0,0,.45)' }}
                      />
                    </Tooltip>
                  }
                />
                {FirebaseController.setupProfile(this.state.displayName)}
              </Modal>
            </div>
          </div>
        )
      },
      {
        title: 'Finish',
        content: (
          <div>
            Your profile will update if you click button "Done" or you can
            change Previous
          </div>
        )
      }
    ];

    return (
      <div>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(SetupProfile);
