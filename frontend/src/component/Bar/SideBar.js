import React from 'react';
import { Col, Card, Button } from 'antd';
import FirebaseController from '../../firebase.js';



const SideBar = () => {
  
  return (

    <div>
    
      <Col span={24}>
        <Card title="Trending" />
      </Col>
      <Col span={24}>
        <Card title="Suggestion" />
          
        
        
      </Col>
    </div>
  );
};

export default SideBar;
