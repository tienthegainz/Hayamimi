import React, { useState, useEffect } from 'react';
import { Col, Card, Avatar, Button, Modal, Menu, Dropdown } from 'antd';
import { LikeOutlined, LikeTwoTone, CommentOutlined, ShareAltOutlined, EllipsisOutlined } from '@ant-design/icons';
import Comments from './Comments';
import FirebaseController from '../../firebase.js';

const Post = (props) => {
  const [likeBtn, setLikeBtn] = useState(<LikeOutlined />);
  const [commentVisible, setCommentVisible] = useState(false);
  const { Meta } = Card;

  const [likesCount, setLikes] = useState(0);
  const [commentsCount, setComments] = useState(0);
  const [sharesCount, setshares] = useState(0);

  const formatedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.date);
  const menu1 = (
    <Menu>
      <Menu.Item key="0">
        Hide
      </Menu.Item>
      <Menu.Item key="1">
        Delete
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu>
      <Menu.Item key="0">
        Hide
      </Menu.Item>
    </Menu>
  );

  const handleDelete = () => {
    console.log('Deleted ', props.pid);
    FirebaseController.db.collection('posts').doc(props.pid).delete();
  }

  const onLikeBtnClick = () => {
    if (likeBtn.type.render.name === 'LikeOutlined') 
    {
      setLikeBtn(<LikeTwoTone />);
      setLikes(1);
      
    }
    else {
      setLikeBtn(<LikeOutlined />);
      setLikes(0);
    }
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
            <Button type="text" icon={likeBtn} onClick={onLikeBtnClick}></Button>
            <span className="comment-action">{likesCount}</span>
          </span>,
          <span>
            <Button type="text" icon={<CommentOutlined />} onClick={onCommentBtnClick}></Button>
            <span className="comment-action">{}</span>
            {/* comments.length */}
          </span>,
          <span>
            <Button type="text" icon={<ShareAltOutlined />}></Button>
            <span className="comment-action">{sharesCount}</span>
          </span>
        ]}
        extra={
          <Dropdown overlay={(props.permission) ? (
            <Menu>
              <Menu.Item key="0">
                Hide
              </Menu.Item>
              <Menu.Item key="1" onClick={handleDelete}>
                Delete
              </Menu.Item>
            </Menu>
          ) : (
              <Menu>
                <Menu.Item key="0">
                  Hide
              </Menu.Item>
              </Menu>
            )} trigger={['click']} style={{ float: 'right' }}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        }
      >
        <Meta title={<a href="#">{props.displayName}</a>} avatar={<Avatar src={props.avatar} />} />
        <div>{formatedDate}</div>
        <div style={{ marginTop: 20 }}>{props.content}</div>
        {(props.img) ? <img src={props.img} style={{ display: 'block', margin: 'auto', maxWidth: '100%' }} alt='img' /> : <></>}
        <Modal title="Comment" visible={commentVisible} onCancel={handleCancel} footer={null}>
          <Comments listComments={props.comments} post_id={props.uid} />
        </Modal>
      </Card>
    </Col>
  );
};

export default Post;