import React, {useState} from 'react';
import {Button, Cascader, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space} from "antd";
import {create} from "~/parse_server";
import dayjs from "dayjs";

const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 8,
    },
};
const ModalForm = (props) => {
        const {title, titleAdd, titleUpdate, onCreate, onUpdate, setEditing, editing} = props
        const {selectRecord = {}, isOpen} = editing
        const {type_category, description, amount, trade_date, objectId} = selectRecord

        const configDate = {
            rules: [{type: 'object', required: true, message: 'Please select time!',},],
        };

        const onFinish = (fieldsValue) => {
            const values = {
                ...fieldsValue,
                'trade_date': fieldsValue['trade_date'].format('YYYY-MM-DD'),
                type: fieldsValue.type_category[0],
                category: fieldsValue.type_category[1],
                objectId: selectRecord?.objectId
            }
            const {objectId} = values
            objectId ? onUpdate(values, objectId) : onCreate(values)
            setEditing({isOpen: false})
        }

        return (
            <Modal title={objectId ? titleUpdate : titleAdd} open={isOpen} onCancel={() => setEditing({isOpen: false})}
                   destroyOnClose={true} footer={null}
            >
                <Form
                    name="basic" labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    style={{maxWidth: 600,}}
                    onFinish={onFinish}
                    initialValues={{type_category:type_category, description: description, amount: amount, trade_date: dayjs(trade_date)}}
                >
                    <Form.Item label="Category" name={'type_category'}
                               rules={[{required: true, message: 'Please select your category!',},]}>
                        <Cascader placeholder="Please select"
                                  options={[
                                      {
                                          value: 'Incomes', label: 'Incomes',
                                          disabled: title !== 'Incomes',
                                          children: [
                                              {value: 'Interest', label: 'Interest',},
                                              {value: 'Investments', label: 'Investments',},
                                              {value: 'Gifts', label: 'Gifts',},
                                              {value: 'Selling', label: 'Selling',},
                                              {value: 'Another', label: 'Another',},
                                          ],
                                      },
                                      {
                                          value: 'Spendings', label: 'Spendings',
                                          disabled: title !== 'Spendings',
                                          children: [
                                              {value: 'Allowance', label: 'Allowance',},
                                              {value: 'License', label: 'License',},
                                              {value: 'Mortgage', label: 'Mortgage',},
                                              {value: 'Paying', label: 'Paying',},
                                              {value: 'Another', label: 'Another',},
                                          ],
                                      },
                                  ]}
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
                        <InputNumber min={1} className={'w-full'} placeholder="amount"
                                     step={0.01} precision={2}
                                     formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item name="trade_date" label="Trade date" {...configDate}>
                        <DatePicker/>
                    </Form.Item>

                    <Form.Item key="submit" {...tailLayout}>
                        <Space>
                            <Popconfirm key="back" title="Sure to return?" onConfirm={() => setEditing({isOpen: false})}>
                                <Button>Return</Button>
                            </Popconfirm>

                            <Button type="primary" htmlType="submit">Save</Button></Space>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
;

export default ModalForm;