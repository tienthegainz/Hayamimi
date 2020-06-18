import React, { useState } from 'react';
import { Col, Card, Avatar, Button, Modal } from 'antd';
import { LikeOutlined, LikeTwoTone, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import Comments from './Comments';

const Post = (props) => {
  const { content, img, date, uid } = props;
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
        <Meta title={uid} avatar={<Avatar src='https://emblemsbf.com/img/77148.webp' />} />
        <div style={{ marginTop: 20 }}>{content}</div>
        {(img) ? <img src={img} style={{ display: 'block', margin: 'auto', maxWidth: '100%' }} alt='img' /> : <></>}
        <Modal title="Comment" visible={commentVisible} onCancel={handleCancel} footer={null}>
          {/* <Comments listComments={comments} /> */}
        </Modal>
      </Card>
    </Col>
  );
};

export default Post;