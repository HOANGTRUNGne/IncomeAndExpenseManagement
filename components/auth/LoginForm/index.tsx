import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { LoginPayload } from '~/models';

export interface LoginFormProps {
    onSubmit?: (payload: LoginPayload) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const onFinish = async (values: LoginPayload) => {
        await onSubmit?.(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const initialValues = {
        remember: false,
    };

    return (
        <Form name="normal_login" initialValues={initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input prefix={<UserOutlined className="text-gray-300" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input.Password
                    prefix={<LockOutlined className="text-gray-300" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" className="mb-2">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="mb-4 block text-right" href="">
                Forget Your Password?
            </Link>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    LOGIN
                </Button>
            </Form.Item>

            <span className="mr-1 text-gray-400">Don&apos;t have account?</span>
            <Link className="" href="">
                Signup
            </Link>
        </Form>
    );
}
