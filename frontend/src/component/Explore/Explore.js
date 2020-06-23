import React, { useState, useEffect } from "react";
import { Card, Input, Tabs } from "antd";
import Feed from "../Feed/Feed";
import Users from "./Users";

const { Search } = Input;
const { TabPane } = Tabs;

const Explore = () => {
  const [query, setQuery] = useState("");

  const onChange = (e) => {
    if (e.target.value === "") setQuery("");
  };

  return (
    <div>
      <Card>
        <Search
          placeholder="Search Hayamimi"
          enterButton="Search"
          onSearch={(value) => setQuery(value)}
          onChange={onChange}
          allowClear
        />
      </Card>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Posts" key="1">
          <Feed search={query} />
        </TabPane>
        <TabPane tab="Users" key="2">
          <Users search={query} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Explore;
