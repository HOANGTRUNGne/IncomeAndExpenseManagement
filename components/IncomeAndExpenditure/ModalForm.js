import React from 'react';
import {Button, DatePicker, Form, Input, InputNumber, message, Modal, Select, Space, Upload} from "antd";
import dayjs from "dayjs";
import {createParseObject, creatParseFile} from '../../parse_server/index';
import {UploadOutlined} from "@ant-design/icons";

const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 8,
    },
};

const UploadInvoice = ({onChange}) => {
    const propsInvoice = {
        beforeUpload:() => false,
        onChange: (info) => {
            onChange(creatParseFile(info.file));
        },
    };
    return (
        <Upload {...propsInvoice} accept={"application/pdf"}>
            <Button icon={<UploadOutlined/>}>Upload</Button>
        </Upload>
    )
}
const ModalForm = (props) => {
        const {title: type, titleAdd, titleUpdate, onCreate, onUpdate, setEditing, editing, categoriesData = []} = props
        const {selectRecord = {}, isOpen} = editing
        const {category, description, amount, trade_date, objectId} = selectRecord
        const configDate = {rules: [{type: 'object', required: true, message: 'Please select time!',},],};
        const onFinish = (fieldsValue) => {

            const values = {
                ...fieldsValue,
                'trade_date': fieldsValue['trade_date'].format('YYYY-MM-DD'),
                type: type,
                objectId: selectRecord?.objectId,
                category: createParseObject("Categories", fieldsValue.category).toPointer()
            }
            console.log(values)
            const {objectId} = values
            objectId ? onUpdate(values, objectId) : onCreate(values)
            setEditing({isOpen: false})
        }

        return (
            <Modal title={objectId ? titleUpdate : titleAdd} open={isOpen} onCancel={() => setEditing({isOpen: false})}
                   destroyOnClose={true} footer={null}
            >
                <Form
                    name="IncomeAndExpenditure" labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    style={{maxWidth: 600,}}
                    onFinish={onFinish}
                    initialValues={{
                        category: category?.objectId,
                        description: description,
                        amount: amount,
                        trade_date: dayjs(trade_date)
                    }}
                >
                    <Form.Item label="Category" name={'category'}
                               rules={[{required: true, message: 'Please select your category!',},]}>
                        <Select placeholder="Please select category" options={categoriesData}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Description" name="description"
                        rules={[
                            {required: true, message: 'Please input your description!'},
                            {max: 25, message: 'no more than 25 characters in length'},]}
                    >
                        <Input type='text' placeholder="description"/>
                    </Form.Item>

                    <Form.Item
                        name="amount" label="Amount"
                        rules={[{required: true, message: 'Please input your amount!',},]}
                    >
                        <InputNumber min={1} className={'w-full'}
                                     step={0.01} precision={2}
                                     formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item name="trade_date" label="Trade date" {...configDate}>
                        <DatePicker/>
                    </Form.Item>

                    <Form.Item label="Invoice" name="invoice">
                        <UploadInvoice/>
                    </Form.Item>

                    <Form.Item key="submit" {...tailLayout}>
                        <Space>
                            <Button onClick={() => setEditing({isOpen: false})}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Save</Button></Space>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
;

export default ModalForm;