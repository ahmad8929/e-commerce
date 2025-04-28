
import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions';

const { TabPane } = Tabs;

const SlidingWindow = ({ visible, onClose }) => {
    const [formType, setFormType] = useState('login');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleFormChange = (key) => {
        setFormType(key);
    };

    const onLoginFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.token) {
                // Dispatch the Redux action if login is successful
                dispatch(loginSuccess());
                message.success('Login successful');
                onClose(); // Close the drawer after login
            } else {
                message.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            message.error('Login failed. Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const onSignUpFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    email: values.email,
                    username: values.username,
                    password: values.password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data && data.id) {
                message.success('Sign-up successful, please login.');
                setFormType('login'); // Automatically switch to login form after successful sign-up
            } else {
                message.error('Sign-up failed. Please try again.');
            }
        } catch (error) {
            message.error('Sign-up failed. Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer
            title="Account"
            placement="right"
            onClose={onClose}
            visible={visible}
            width={400}
        >
            <Tabs activeKey={formType} onChange={handleFormChange}>
                <TabPane tab="Login" key="login">
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        layout="vertical"
                        onFinish={onLoginFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Login
                            </Button>
                        </Form.Item>
                        <div style={{ color: 'red', textAlign: 'center', marginTop: '8px' }}>
                            Currently you can only login with
                            <br /> <b>user ID = mor_2314</b> <br />
                            <b>password = 83r5^_</b>
                            <br />  Developer is working to resolve this issue.
                        </div>
                    </Form>
                </TabPane>
                <TabPane tab="Sign Up" key="signup">
                    <Form
                        name="signup"
                        initialValues={{ remember: true }}
                        layout="vertical"
                        onFinish={onSignUpFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Drawer>
    );
};

export default SlidingWindow;
