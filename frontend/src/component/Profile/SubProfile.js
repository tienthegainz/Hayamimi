import React from 'react';
import Post from "../Post/Post.js";
import data from "../../fake_data.json";
import { Tabs, PageHeader, Layout, Row, Card, Avatar, Input, Button } from 'antd';
import {
  UserOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
// import { withRouter } from 'react-router-dom';
import "./profile.css";

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const center = {
  padding: '8px 0 8px 16px'
};


const SubProfile = () => {
  const { Meta } = Card;
  const { TextArea } = Input;
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Hiep Tran"
        subTitle="0 Tweet"
      />

      <Row>
        <div className="setup-avatar">
          <div className="background-image">

          </div>
          <div className="avatar-image">
            <Avatar size={150} icon={<UserOutlined />} />
          </div>
          
          <Button type="primary" shape="round" className="setup-profile" size="large">
            Set Up Profile

          </Button>
          <div className="information">
            <div className="my-name">Hiep Tran</div>
            <div>@HiepTran0343742152</div>
            <div><ScheduleOutlined /> Joined January 2020</div>

          </div>
        </div>

      </Row>

      <Row>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tweets" key="1">
          {data.posts.map((post, idx) => {
            const user = data.users.find((user) => user.id === post.user_id);
            let comments = data.comments.filter((cmts) => cmts.post_id === post.id);
            comments = comments.map((cmt) => {
            const user = data.users.find((user) => user.id === cmt.user_id);
            return { ...cmt, author: user.name, avatar: user.avatar };
            });
            return (
              <Post
                key={idx}
                content={post.content}
                img={post.image}
                user={user}
                comments={comments}
              />
            );
          })}
        </TabPane>
          <TabPane tab="Following" key="2">
            This is all your Following here
         </TabPane>
          <TabPane tab="Followed" key="3">
            This is all your Followed here
         </TabPane>
        </Tabs>
      </Row>






    </div>
  );
};

export default SubProfile;
