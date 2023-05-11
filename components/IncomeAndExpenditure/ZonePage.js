import React, {useState} from 'react';
import {Card, Col, Dropdown, Layout, Pagination, Row, Space} from 'antd';
import {DownOutlined, PlusOutlined} from "@ant-design/icons";

const {Content} = Layout;

const ZonePage = (props) => {
    const {data = [], handleClickDelete, setEditing, classCard = '', typeCategory = ''} = props
    const [valuePagin, setValuePagin] = useState({min: 0, max: 6})
    const {max, min} = valuePagin

    const generateItems = (record) => {
        return [
            {
                label: <a onClick={() => setEditing({selectRecord: record, isOpen: true})}>Edit</a>,
                key: '0',
            },
            {label: <a>Archive</a>, key: '1',},
            {label: <a onClick={() => handleClickDelete(record.objectId)}>Remove</a>, key: '2',},
        ];
    }

    const handlePagination = (value) => {
        if (value <= 1) {
            setValuePagin({min: 0, max: 6})
        } else {
            setValuePagin({min: max, max: value * 6})

        }
    };
    return (
        <Content className={'px-8 pt-3 h-full'}>
            {
                data.filter(e => e.type === typeCategory).slice(min, max).map(record => {
                    const integerPart = Math.floor(record.amount)
                    const decimalPart = (record.amount - integerPart).toFixed(2).substring(1)
                    return (
                        <Card key={record.objectId} className={`border-l-4 mt-2.5 ${classCard}`}>
                            <Row>
                                <Col span={12}>
                                    <h3 className={'text-slate-600'}>{record.description}
                                        {record?.category?.icon ?
                                            <span className={'ml-2'}>
                                                <img src={record?.category?.icon?.url} alt={'icon'} width={26}
                                                     height={27}/>
                                            </span>
                                            :
                                            <span className={'text-slate-400 text-sm ml-2'}>
                                                {record?.category?.name}
                                            </span>
                                        }
                                    </h3>
                                    <span
                                        className={'font-light text-xs text-slate-400 '}>{record.trade_date}</span>
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
                })}
            <Pagination  className={'mt-4'} total={data.length} onChange={handlePagination} defaultCurrent={1}
                        defaultPageSize={7}/>
        </Content>

    );
};

export default ZonePage;
