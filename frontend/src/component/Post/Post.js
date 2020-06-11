import React, { useState } from 'react';
import { Col, Card, Avatar, Button, Modal } from 'antd';
import { LikeOutlined, LikeTwoTone, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import PostComment from './PostComment';

const Post = (props) => {
  const { user, content, img, comments } = props;
  const [likeBtn, setLikeBtn] = useState(<LikeOutlined />);
  const [commentVisible, setCommentVisible] = useState(false);

  const { Meta } = Card;

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
      >
        <Meta title={user.name} avatar={<Avatar src={user.avatar} />} />
        <div style={{ marginTop: 20 }}>{content}</div>
        <img src={img} style={{ display: 'block', margin: 'auto' }} />
        <Modal title="Comment" visible={commentVisible} onCancel={handleCancel} footer={null}>
          <PostComment listComments={comments} />
        </Modal>
      </Card>
    </Col>
  );
};

export default Post;