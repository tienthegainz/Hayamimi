import React, { useState } from "react";
import { Col, Card, Avatar, Button, Modal, Menu, Dropdown } from "antd";
import {
  LikeOutlined,
  LikeTwoTone,
  CommentOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";

import Comments from "./Comments";
import FirebaseController from "../../firebase.js";

const Post = (props) => {
  const currentUID = localStorage.getItem("uid");

  const [liked, setLiked] = useState(
    props.likes.includes(currentUID) ? true : false
  );
  const [commentVisible, setCommentVisible] = useState(false);
  const { Meta } = Card;

  const [likes, setLikes] = useState(props.likes);
  const [likesCount, setLikesCount] = useState(props.likes.length);
  const [likeMutex, setLikeMutex] = useState(true);

  const formatedDate = props.date;

  const menu1 = (
    <Menu>
      <Menu.Item key="0">Hide</Menu.Item>
      <Menu.Item key="1">Delete</Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu>
      <Menu.Item key="0">Hide</Menu.Item>
    </Menu>
  );

  const handleDelete = () => {
    console.log("Deleted ", props.pid);
    FirebaseController.db.collection("posts").doc(props.pid).delete();
  };

  const onLikeBtnClick = async () => {
    // if (likeMutex === false) return;
    // setLikeMutex(false);
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
      console.log("Likes: ", likes);
      let new_likes = likes;
      new_likes.push(currentUID);
      if (!likes.includes(currentUID)) setLikes(new_likes);
    } else {
      setLiked(false);
      setLikesCount(likesCount - 1);
      if (likes.length > 0)
        if (likes.includes(currentUID)) {
          const index = likes.indexOf(currentUID);
          let new_likes = likes;
          new_likes.splice(index, 1);
          setLikes(new_likes);
        }
    }
    await FirebaseController.db.collection("posts").doc(props.pid).update({
      like: likes,
    });
  };

  const onCommentBtnClick = () => {
    setCommentVisible(true);
  };

  const handleCancel = () => {
    setCommentVisible(false);
  };

  return (
    <Col span={24}>
      <Card
        actions={[
          <span>
            <Button
              type="text"
              icon={liked ? <LikeTwoTone /> : <LikeOutlined />}
              onClick={onLikeBtnClick}
            ></Button>
            <span className="comment-action">{likesCount}</span>
          </span>,
          <span>
            <Button
              type="text"
              icon={<CommentOutlined />}
              onClick={onCommentBtnClick}
            ></Button>
            <span className="comment-action">{}</span>
            {/* comments.length */}
          </span>,
        ]}
        extra={
          <Dropdown
            overlay={
              props.permission ? (
                <Menu>
                  <Menu.Item key="0">Hide</Menu.Item>
                  <Menu.Item key="1" onClick={handleDelete}>
                    Delete
                  </Menu.Item>
                </Menu>
              ) : (
                <Menu>
                  <Menu.Item key="0">Hide</Menu.Item>
                </Menu>
              )
            }
            trigger={["click"]}
            style={{ float: "right" }}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <EllipsisOutlined />
            </a>
          </Dropdown>
        }
      >
        <Meta
          title={<Link to={`/user/${props.uid}`}>{props.displayName}</Link>}
          avatar={<Avatar src={props.avatar} />}
        />
        <div>{formatedDate}</div>
        <div style={{ marginTop: 20 }}>{props.content}</div>
        {props.img ? (
          <img
            src={props.img}
            style={{ display: "block", margin: "auto", maxWidth: "100%" }}
            alt="img"
          />
        ) : (
          <></>
        )}
        <Modal
          title="Comment"
          visible={commentVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Comments commentsID={props.commentsID} pid={props.pid} />
        </Modal>
      </Card>
    </Col>
  );
};

export default withRouter(Post);
