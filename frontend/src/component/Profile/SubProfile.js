import React from 'react';
import { Tabs, PageHeader, Layout, Row, Col, Card, Avatar, Input, Button } from 'antd';
import {
  UserOutlined,
  ArrowLeftOutlined,
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
            This is all your Tweet here
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
