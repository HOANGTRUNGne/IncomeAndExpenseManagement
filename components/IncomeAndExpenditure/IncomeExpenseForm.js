import React from 'react';
import {Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, Upload} from "antd";
import dayjs from "dayjs";
import {createParseObject, creatParseFile} from '../../parse_server/index';
import {UploadOutlined} from "@ant-design/icons";
import filter from "~/assets/icons/Filter";
import {capitalizeFirstLetter} from "../../utils";

const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 8,
    },
};

const UploadInvoice = ({onChange}) => {
    const propsInvoice = {
        beforeUpload: () => false,
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

const IncomeExpenseForm = (props) => {
        const { type, onCreate, onUpdate, editing, categoriesData = [], handleModalForm} = props
        const {selectRecord = {}, isOpen} = editing
        const {category, name, amount, transaction_date, objectId} = selectRecord
        const configDate = {rules: [{type: 'object', required: true, message: 'Please select time!',},],};
        const onFinish = (fieldsValue) => {

            const values = {
                ...fieldsValue,
                name:capitalizeFirstLetter(fieldsValue.name),
                'transaction_date': fieldsValue['transaction_date'].toDate(),
                type: type,
                objectId: selectRecord?.objectId,
                category: createParseObject("Categories", fieldsValue.category).toPointer()
            }
            console.log(values)
            const {objectId} = values
            objectId ? onUpdate(values, objectId) : onCreate(values)
            handleModalForm()
        }


        return (
            <Modal title={objectId ? `Update ${type}` : `Add ${type}`} open={isOpen} onCancel={() => handleModalForm()}
                   destroyOnClose={true} footer={null}
            >
                <Form
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    style={{maxWidth: 600,}}
                    onFinish={onFinish}
                    onValuesChange={console.log}
                    initialValues={{
                        category: category?.objectId,
                        name: name,

                        amount: amount,
                        transaction_date: dayjs(transaction_date)
                    }}
                >
                    <Form.Item label="Category" name={'category'}
                               rules={[{required: true, message: 'Please select your category!',},]}>
                        <Select placeholder="Please select category" options={categoriesData}
                        />
                    </Form.Item>


                    <Form.Item
                        label="Name" name="name"
                        rules={[
                            {required: true, message: 'Please input your name!'},
                            {max: 25, message: 'no more than 25 characters in length'},]}
                    >
                        <Input type='text' placeholder="Name"/>
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

                    <Form.Item name="transaction_date" label="Transaction date" {...configDate}>
                        <DatePicker/>
                    </Form.Item>

                    <Form.Item label="Invoice" name="invoice">
                        <UploadInvoice/>
                    </Form.Item>

                    <Form.Item key="submit" {...tailLayout}>
                        <Space>
                            <Button onClick={() => handleModalForm()}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Save</Button></Space>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
;``
export default IncomeExpenseForm;