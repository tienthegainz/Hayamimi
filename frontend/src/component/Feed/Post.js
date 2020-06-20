import React, { useState, useEffect } from 'react';
import { Col, Card, Avatar, Button, Modal, Menu, Dropdown } from 'antd';
import { LikeOutlined, LikeTwoTone, CommentOutlined, ShareAltOutlined, EllipsisOutlined } from '@ant-design/icons';
import Comments from './Comments';
// import FirebaseController from '../../firebase.js';

const Post = (props) => {
  const [likeBtn, setLikeBtn] = useState(<LikeOutlined />);
  const [commentVisible, setCommentVisible] = useState(false);
  const { Meta } = Card;

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

  const topOpt = (
    <Dropdown overlay={(props.permission) ? menu1 : menu2} trigger={['click']} style={{ float: 'right' }}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  )

  const onLikeBtnClick = () => {
    if (likeBtn.type.render.name === 'LikeOutlined') setLikeBtn(<LikeTwoTone />);
    else setLikeBtn(<LikeOutlined />);
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
          <Button type="text" icon={likeBtn} onClick={onLikeBtnClick}></Button>,
          <Button type="text" icon={<CommentOutlined />} onClick={onCommentBtnClick}></Button>,
          <Button type="text" icon={<ShareAltOutlined />}></Button>
        ]}
        extra={topOpt}
      >
        <Meta title={<a href="#">{props.displayName}</a>} avatar={<Avatar src={props.avatar} />} />
        <div style={{ marginTop: 20 }}>{props.content}</div>
        {(props.img) ? <img src={props.img} style={{ display: 'block', margin: 'auto', maxWidth: '100%' }} alt='img' /> : <></>}
        <Modal title="Comment" visible={commentVisible} onCancel={handleCancel} footer={null}>
          {/* <Comments listComments={comments} /> */}
        </Modal>
      </Card>
    </Col>
  );
};

export default Post;