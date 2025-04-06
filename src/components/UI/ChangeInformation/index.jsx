import "./style.css";
import {Button, Col, ConfigProvider, Form, Input, notification, Row, Upload,} from "antd";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PlusOutlined} from "@ant-design/icons";
import {updateUserWithFormData} from "../../../services/api/user/index.js";
import {login} from "../../../redux/actions/auth/index.js";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const ChangeInformation = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const authInfo = useSelector(state => state.auth);
    const [imgSrc, setImgSrc] = useState(authInfo.avatar);
    const dispatch = useDispatch();
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
            setLoading(true);
            let objUpdt = {
                id: authInfo.id,
                bio: values.bio,
                username: values.username,
                name: values.name,
                social_link: values.social_link,
            }
            const formData = new FormData();
            if (values.avatar) {
                formData.append("avatar", values.avatar.file);
            }
            formData.append("user", new Blob([JSON.stringify(objUpdt)], {type: "application/json"}));
            let userInfoUpdated = {};
            userInfoUpdated = (await updateUserWithFormData(formData)).content;
            dispatch(login(userInfoUpdated));
            form.setFieldsValue({
                ...userInfoUpdated,
                nickname: userInfoUpdated.nickName ? userInfoUpdated.nickName : '',
                website: userInfoUpdated.socialMediaLink ? userInfoUpdated.socialMediaLink : '',
            })
            openNotification("Update success", "Update your information was success, get back for detail");
            setLoading(false)
        })();
    };
    return (
        <>
            {contextHolder}
            <Row justify={"center"}>
                <Col span={6}>
                    {imgSrc &&
                        <img src={imgSrc}
                             style={{width: 200, aspectRatio: "1/1", objectFit: "cover", borderRadius: "50%"}}/>}
                </Col>
                <Col span={12}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    activeBorderColor: "#31c27c",
                                    hoverBorderColor: "#31c27c",
                                },
                            },
                        }}
                    >
                        <Form
                            size="large"
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{
                                name: authInfo.name ? authInfo.name : '',
                                username: authInfo.username ? authInfo.username : '',
                                social_link: authInfo.social_link ? authInfo.social_link : '',
                                bio: authInfo.bio ? authInfo.bio : ''
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                dependencies={["name"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please confirm your name!",
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="username"
                                label="E-mail"
                                rules={[
                                    // {
                                    //   type: "email",
                                    //   message: "The input is not valid E-mail!",
                                    // },
                                    {
                                        required: true,
                                        message: "Please input your E-mail!",
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="social_link"
                                label="Social media link"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your social media link!",
                                    },
                                ]}
                            >
                                <Input placeholder="your link"/>
                            </Form.Item>

                            <Form.Item
                                name="bio"
                                label="Bio"
                            >
                                <Input.TextArea
                                    showCount
                                    maxLength={850}
                                    style={{height: 200}}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Upload Avatar"
                                name={"avatar"}
                            >
                                <Upload
                                    multiple={false}
                                    beforeUpload={(file) => {
                                        const reader = new FileReader();
                                        reader.onload = e => {
                                            setImgSrc(e.target?.result + "");
                                        }
                                        reader.readAsDataURL(file);
                                        return false;
                                    }}
                                    showUploadList={false}
                                    listType="picture-card"
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: "none",
                                        }}
                                        type="button"
                                    >
                                        <PlusOutlined/>
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    className="btn-song-of-playlistt-update"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Update your profile
                                </Button>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </Col>
                <Col span={6}></Col>
            </Row>
        </>
    );
};
export default ChangeInformation;
