import React from 'react';
import {Card, Col, Dropdown, Layout, Row, Space} from 'antd';
import {DownOutlined, PlusOutlined} from "@ant-design/icons";

const {Content} = Layout;

const ZonePage = (props) => {
    const {data = [], handleClickDelete, setEditing, classCard = '', typeCategory = ''} = props

    const generateItems = (record) => {
        return [
            {
                label: <a onClick={() => setEditing({selectRecord: record, isOpen: true})}>Edit</a>,
                key: '0',
            },
            {
                label: <a>Archive</a>,
                key: '1',
            },
            {
                label: <a onClick={() => handleClickDelete(record.objectId)}>Remove</a>,
                key: '2',
            },
        ];
    }

    return (
        <Content className={'px-8 pt-3'}>
            {
                data.filter(e => e.type === typeCategory).map(record => {
                    const integerPart = Math.floor(record.amount)
                    const decimalPart = (record.amount - integerPart).toFixed(2).substring(1)
                    return (
                        <Card key={record.objectId} className={`border-l-4 mt-2.5 ${classCard}`}>
                            <Row>
                                <Col span={12}>
                                    <h3 className={'text-slate-600'}>{record.description}
                                        <span className={'text-slate-400 text-sm ml-1'}>{`(${record.category})`}</span>
                                    </h3>

                                    <span className={'font-light text-xs text-slate-400 '}>{record.trade_date}</span>
                                </Col>
                                <Col span={5} offset={7} className={'flex items-center justify-end'}>
                                    <Space>
                                        <h3 className={'text-xl'}>
                                            {integerPart.toLocaleString()}
                                            <span className={'text-gray-400'}>{decimalPart}</span>
                                        </h3>
                                        <Dropdown menu={{items: generateItems(record)}} arrow trigger={['click']}>
                                            <DownOutlined/>
                                        </Dropdown>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>)
                })
            }
        </Content>
    );
};

export default ZonePage;

