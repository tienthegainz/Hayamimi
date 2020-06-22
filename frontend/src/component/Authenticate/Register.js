import React from "react";
import { Form, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import FirebaseController from "../../firebase.js";

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 8 } };

const tailLayout = { wrapperCol: { offset: 8, span: 8 } };

const Register = (props) => {
  if (localStorage.getItem("isLoggedIn") === "true") props.history.push("/");

  const onFinish = async (values) => {
    try {
      await FirebaseController.register(
        values.email,
        values.password,
        values.nickname,
        values.birthday
      );
      alert("Success");
      props.history.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Something went wrong. Try again");
    // console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <br></br>
      <br></br>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nickname"
          name="nickname"
          rules={[{ required: true, message: "Please input your nickname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <br></br>
          <Button type="link" href="/login">
            Go to Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Register);
