import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
// import { QqOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};

function Login() {

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='Login'>
            <br></br><br></br>
            < Form
                {...layout}
                name="basic"
                initialValues={
                    {
                        remember: true,
                    }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                    &emsp;&emsp;
                    <Button
                        type="default"
                        href="/register"
                    >
                        Go to Register
                    </Button>
                </Form.Item>
            </Form >
        </div >
    );
}

export default withRouter(Login);
