import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {useContext} from "react";
import {AuthContext} from "../index";


const LoginForm = () => {
    const contextAuth = useContext(AuthContext)
    const {handleLogin} = contextAuth
    const onFinish = async (values) => {
        await handleLogin(values);
    };


    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        console.log(  values, errorFields, outOfDate);
    };

    const initialValues = {
        remember: false,
    };

    return (
        <Form name="normal_login" initialValues={initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>

            <Form.Item name="username" rules={[{required: true, message: 'Please input your Username!'}]}>
                <Input prefix={<UserOutlined className="text-gray-300"/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item name="password" rules={[{required: true, message: 'Please input your Password!'}]}>
                <Input.Password
                    prefix={<LockOutlined className="text-gray-300"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" className="mb-2">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    LOGIN
                </Button>
            </Form.Item>


        </Form>
    );
}

export default LoginForm;