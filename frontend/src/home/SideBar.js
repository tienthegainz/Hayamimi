import React from 'react';
import { Col, Card } from 'antd';

const SideBar = () => {
  return (
    <>
      <Col span={24}>
        <Card title="Trending" />
      </Col>
      <Col span={24}>
        <Card title="Suggestion" />
      </Col>
    </>
  );
};

export default SideBar;
