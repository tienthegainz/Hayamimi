import React, { useState } from 'react';
import { Col, Card, Avatar, Button, Modal, Tooltip } from 'antd';
import { LikeOutlined, LikeTwoTone, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import Comments from './Comments';
import moment from 'moment';

const Post = (props) => {
  const { user, content, img, comments, id, date, like } = props;
  const [likeBtn, setLikeBtn] = useState(<LikeOutlined />);
  const [commentVisible, setCommentVisible] = useState(false);

  const { Meta } = Card;

  const [likesCount, setLikes] = useState(0);
  const [commentsCount, setComments] = useState(0);
  const [sharesCount, setshares] = useState(0);
  

  const onLikeBtnClick = () => {
    if (likeBtn.type.render.name === 'LikeOutlined') 
    {
      setLikeBtn(<LikeTwoTone />);
      setLikes(like.length + 1);
    }
    else 
    {
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
            <span className="comment-action">{comments.length}</span>
          </span>,
          <span>
            <Button type="text" icon={<ShareAltOutlined />}></Button>
            <span className="comment-action">{sharesCount}</span>
          </span>
        ]}
      >
        <Meta title={user.name} avatar={<Avatar src={user.avatar} />} />
        {/* datetime */}
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().date(date)}</span>
        </Tooltip>
      
        <div style={{ marginTop: 20 }}>{content}</div>
        <img src={img} style={{ display: 'block', margin: 'auto', maxWidth: '100%' }} alt='img'/>
        <Modal title="Comment" visible={commentVisible} onCancel={handleCancel} footer={null}>
          <Comments listComments={comments} />
        </Modal>
      </Card>
      
    </Col>
  );
};

export default Post;