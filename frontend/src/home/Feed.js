import React from 'react';
import { Layout, Col, Card, Avatar, Input, Button } from 'antd';

import {
  UserOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

const {Header, Footer, Sider, Content} = Layout;

const Feed = () => {
  const { Meta } = Card;
  const { TextArea } = Input;
  return (
    <>
      <Col span={24}>
        <Card title="Home">
          <TextArea placeholder="What's happening?" autoSize={{ minRows: 2 }} />
          <Button type="primary" style={{ float: 'right', marginTop: 15 }}>
            Tweet
          </Button>
        </Card>
      </Col>

      <Col span={24}>
        <Card
          actions={[
            <LikeOutlined key="like" />,
            <CommentOutlined key="comment" />,
            <ShareAltOutlined key="share" />
          ]}
        >
          <Meta
            title="Khánh Ly"
            description="@vukhanhly30"
            avatar={
              <Avatar
                style={{ backgroundColor: '#87d068' }}
                icon={<UserOutlined />}
              />
            }
          />
          <div style={{ marginTop: 20 }}>Hello World !</div>
        </Card>
      </Col>

      <Col span={24}>
        <Card
          actions={[
            <LikeOutlined key="like" />,
            <CommentOutlined key="comment" />,
            <ShareAltOutlined key="share" />
          ]}
        >
          <Meta
            title="Hà Việt Tiến"
            description="@hvt"
            avatar={
              <Avatar
                style={{ backgroundColor: '#ff4d4f' }}
                icon={<UserOutlined />}
              />
            }
          />
          <div style={{ marginTop: 20 }}>Hôm nay trời đẹp nhỉ, đi dạo thôi</div>
        </Card>
      </Col>

      <Col span={24}>
        <Card
          actions={[
            <LikeOutlined key="like" />,
            <CommentOutlined key="comment" />,
            <ShareAltOutlined key="share" />
          ]}
        >
          <Meta
            title="Bùi Ngọc Tú"
            description="@tubuooi"
            avatar={
              <Avatar
                style={{ backgroundColor: '#faad14' }}
                icon={<UserOutlined />}
              />
            }
          />
          <div style={{ marginTop: 20 }}>Mình đẹp trai quá</div>
        </Card>
      </Col>
    </>
  );
};

export default Feed;
