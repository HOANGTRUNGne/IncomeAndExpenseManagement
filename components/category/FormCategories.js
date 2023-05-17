import React, {useState} from 'react';
import {Button, Form, Input, Modal, Space, Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {creatParseFile} from "../../parse_server";

const {TextArea} = Input;
const tailLayout = {
    wrapperCol: {offset: 16, span: 8,},
};

const UploadIcon = ({value = {}, onChange, iconEdit}) => {
    const [loadingIcon, setLoadingIcon] = useState(false);
    const [icon, setIcon] = useState(value?.url);

    const propsIcon = {
        name: 'file',
        beforeUpload: () => false,
        async onChange(info) {
            setLoadingIcon(true)
            setIcon(URL.createObjectURL(info.file))
            onChange(creatParseFile(info.file));
        },
    };
    const uploadButton = (
        <div>{loadingIcon ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8,}}>Upload</div>
        </div>
    );
    return (
        <Upload showUploadList={false} listType="picture-card" {...propsIcon}>
            {icon ? (
                <img src={icon} alt="icon" style={{width: '100%',}}/>
            ) : (
                uploadButton
            )}
        </Upload>
    )
}


const FormCategories = (props) => {
    const {onFinish, editingCategories, setEditingCategories} = props
    const {record = {}, isOpen} = editingCategories
    const {type, description, name , icon, objectId} = record
    const finish = (values) => {
        onFinish({...values, objectId})
    }
    return (
        <Modal title={objectId ? 'Edit Categories' : 'Add Categories'} open={isOpen}
               onCancel={() => {
                   setEditingCategories({isOpen: false});
               }}
               destroyOnClose={true} footer={null}>

            <Form name="categories" labelCol={{span: 8,}}
                  wrapperCol={{span: 16,}} style={{maxWidth: 600,}}
                  initialValues={{type: type, description: description, name: name, icon: icon}}
                  onFinish={finish}
            >

                <Form.Item label="Categories" name="name"
                           rules={[{required: true, message: 'Please input your username!',},]}>
                    <Input placeholder={'Name categories'}/>
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <TextArea showCount maxLength={50} placeholder="description"/>
                </Form.Item>

                <Form.Item label="Upload" name="icon">
                    <UploadIcon {...{iconEdit:icon}}/>
                </Form.Item>


                <Form.Item key="submit" {...tailLayout}>
                    <Space>
                        <Button onClick={() => setEditingCategories({isOpen: false})}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FormCategories;