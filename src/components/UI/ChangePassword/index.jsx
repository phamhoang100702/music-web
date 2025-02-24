import React from 'react';
import {Button, Form, notification, Input} from 'antd';
import {changePassword} from "../../../services/api/user/index.js";


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const ChangePassword = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (title, description) => {
        api['success']({
            key: 1,
            message: title,
            description: description,
        });
    };
    const onFinish = (values) => {
        (async () => {
            const request = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                retypePassword: values.retypePassword,
            }
            let response = await changePassword(request);
            if (response.status === "ok") {
                openNotification("Change password successful", "Change password successful");
            }

        })();

    };
    return (
        <Form
            name="change-password"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your old password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="Retype Password"
                name="retypePassword"
                rules={[
                    {
                        required: true,
                        message: 'Please retype your password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
export default ChangePassword;
