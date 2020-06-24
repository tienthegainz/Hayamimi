import React, { useState } from "react";
import { Card, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FirebaseController from "../../firebase.js";
import { confirmAlert } from "react-confirm-alert";

const UploadPost = () => {
  const { TextArea } = Input;
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const uploadPost = async () => {
    let userDoc = await FirebaseController.db
      .collection("users")
      .doc(FirebaseController.getCurrentUser().uid)
      .get();
    const userData = userDoc.data();
    if (userData.isBlocked) {
      // user is blocked
      return confirmAlert({
        title: "Alert",
        message: "You have been blocked from upload post and comment",
        buttons: [
          {
            label: "I understand",
            onClick: () => {
              return;
            },
          },
        ],
      });
    }
    else {
      // console.log(status);
      if (!status && image === null) {
        return;
      }
      console.log(status)
      setSubmitting(true);
      if (image) {
        const random_name =
          (Math.random().toString(36) + '00000000000000000').slice(2, 10) +
          '.' +
          image.name.split('.').slice(-1);
        // console.log(random_name)
        const uploadTask = FirebaseController.storage
          .ref(`images/${random_name}`)
          .put(image.originFileObj);

        uploadTask.on(
          'state_changed',
          (snapshot) => { },
          (error) => {
            // error function ....
            console.log('Error: ', error);
          },
          () => {
            // complete function ....
            FirebaseController.storage
              .ref('images')
              .child(random_name)
              .getDownloadURL()
              .then((url) => {
                uploadPosttoFireStore(url);
              });
          }
        );
      } else {
        if (image) {
          const random_name =
            (Math.random().toString(36) + "00000000000000000").slice(2, 10) +
            "." +
            image.name.split(".").slice(-1);
          // console.log(random_name)
          const uploadTask = FirebaseController.storage
            .ref(`images/${random_name}`)
            .put(image.originFileObj);

          uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
              // error function ....
              console.log("Error: ", error);
            },
            () => {
              // complete function ....
              FirebaseController.storage
                .ref("images")
                .child(random_name)
                .getDownloadURL()
                .then((url) => {
                  uploadPosttoFireStore(url);
                });
            }
          );
        } else {
          uploadPosttoFireStore(null);
        }
      }
    }
  };
  const uploadPosttoFireStore = async (url) => {
    let data = {
      content: status,
      date: new Date(),
      like: [],
      commentID: [],
      image: url,
      uid: FirebaseController.getCurrentUser().uid,
    };
    // console.log(data);
    FirebaseController.uploadPost(data);
    setTimeout(() => {
      setSubmitting(false);
      setStatus('');
      setImage(null);
      setImageList([]);
    }, 1000);
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
    console.log("onChange: ", e.file);
    if (e.file) {
      setImage(e.file);
    }
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    setImageList(fileList);
  };

  const onRemove = (file) => {
    setImage(null);
  };

  return (
    <div>
      <Card title="Status">
        <TextArea
          placeholder="What's happening?"
          value={status}
          autoSize={{ minRows: 2 }}
          onChange={handleChange}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Upload
            customRequest={dummyRequest}
            onChange={onChange}
            onRemove={onRemove}
            fileList={imageList}
          >
            <Button
              type="ghost"
              style={{ float: "left", marginTop: 15 }}
              listtype="picture"
              className="upload-list-inline"
            >
              <UploadOutlined /> Add Image
            </Button>
          </Upload>
          <Button
            htmlType="submit"
            type="primary"
            style={{ float: "right", marginTop: 15 }}
            onClick={uploadPost}
            loading={submitting}
          >
            Upload
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UploadPost;
