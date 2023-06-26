import React, {useState} from 'react';
import {MainLayout} from '~/components/layout';
import {Button, Col, Form, Input, Row, Select, Space, Upload} from "antd";
import {LoadingOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {creatParseFile} from "~/parse_server";

const UploadPhoto = ({onChange}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const propsPhoto = {
        beforeUpload: () => false,
        onChange: (info) => {
            console.log(info)
            // onChange(creatParseFile(info.file));
        },
    };
    const uploadButton = (
        <>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8,}}>
                Upload
            </div>
        </>
    )
    return (
        <Upload
            name="avatar"
            {...propsPhoto}
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
        >
            {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{width: '100%',}}/>
            ) : (
                uploadButton
            )}
        </Upload>
    )
}

const Profile = () => {


    const onFinish = (values) => {
        console.log('Success:', values);
    };


    return (
        <>
            <div className={'h-4 overflow-hidden w-full '}></div>
            <Row>
                <Col className={'text-center'} offset={8} span={8}>
                    <h1 className={'text-3xl  font-normal mb-2'}>Personal info</h1>
                    <div style={{color: 'rgb(95,99,104)'}}>Info about you and your preferences across Google services
                    </div>
                </Col>
            </Row>
            <Row className={'mt-8'}>
                <Col className={'text-center'} offset={9} span={6}>
                    <Form
                        name="basic"
                        // size={"small"}
                        // wrapperCol={{span: 16, offset: 4}}
                        labelCol={{span: 16}}
                        initialValues={{}}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item>
                            <UploadPhoto/>
                        </Form.Item>

                        <Space size={16}>
                            <Form.Item style={{marginBottom: '10px'}}
                                       name="firstName" label="First name">
                                <Input placeholder="First name" size={"large"}/>
                            </Form.Item>

                            <Form.Item style={{marginBottom: '10px'}}
                                       name="lastName" label="Last name">
                                <Input placeholder="Last name" size={"large"}/>
                            </Form.Item>
                        </Space>

                        <Form.Item
                            name="email" label="E-mail"
                            rules={[{type: 'email', message: 'The input is not valid E-mail!',},]}
                            style={{marginBottom: '10px'}}>
                            <Input placeholder="E-mail" size={"large"}/>
                        </Form.Item>

                        <Form.Item name="gender" label="Gender">
                            <Select style={{textAlign: "left"}} size={"large"}
                                    placeholder="Select your gender" allowClear
                                    options={[
                                        {value: 'male', label: 'Male',},
                                        {value: 'female', label: 'Female',},
                                        {value: 'other', label: 'Other',},
                                    ]}/>
                        </Form.Item>

                        <Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Button size={"large"} block type="primary" htmlType="submit">Save</Button>
                                </Col>
                                <Col span={12}><Button size={"large"} block>Reset</Button></Col>
                            </Row>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </>
    );
};


export default Profile;
Profile.Layout = MainLayout;


