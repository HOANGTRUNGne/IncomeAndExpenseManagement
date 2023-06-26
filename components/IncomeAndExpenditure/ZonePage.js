import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Dropdown, Layout, Modal, Button, Row, Space, Upload, Tooltip} from 'antd';
import {DownOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import ProList from "@ant-design/pro-list";
import {fetchWithPagination} from "~/parse_server";
import {FilterContext} from "../FilterSearch/FilterContext";
import dayjs from "dayjs";
import {parseAmount} from "~/utils";

const {Content} = Layout;


const ZonePage = (props) => {
    const {handleDataFilter, handleClickDelete, handleClickEdit, classCard = '', typeCategory = '', actionRef} = props
    const [modalPDF, setModalPDF] = useState({isOpen: false, pdfUrl: ''})
    const contextFilter = useContext(FilterContext)
    const {filterOption, actionRefIncomes, actionRefSpendings} = contextFilter
    const {
        category, transaction_date
    } = filterOption
    const generateItems = (record) => {
        return [
            {label: <a onClick={() => handleClickEdit(record)}>Edit</a>, key: '0',},
            {
                label: <a onClick={() => setModalPDF({isOpen: true, pdfUrl: record?.invoice?.url})}>Invoice</a>,
                key: '1',
                disabled: !(record?.invoice?.url) ? true : false,
            },
            {label: <a onClick={() => handleClickDelete(record.objectId)}>Remove</a>, key: '2',},
        ];
    }
    useEffect(() => {
        actionRefIncomes.current.reload()
        actionRefSpendings.current.reload()
    }, [filterOption])


    return (
        <>
            <Content className={'px-8 pt-3 h-full'}>
                <ProList
                    actionRef={actionRef}
                    ghost
                    grid={{gutter: [10, 14], column: 1}}
                    request={async (params = {}) => {
                        const {current, pageSize} = params
                        const result = await fetchWithPagination('RevenueExpenditure', {
                            pageSize,
                            currentPage: current,
                            customQuery: (query) => {
                                query.equalTo('type', typeCategory),
                                category && query.equalTo('category', category),
                                    query.equalTo('status', 'Completed'),
                                transaction_date && query.greaterThanOrEqualTo('transaction_date', transaction_date[0])?.lessThanOrEqualTo('transaction_date', transaction_date[1])
                            }
                        })
                        const data = result.results.map(e => {
                            return {
                                ...e.toJSON(),
                                transaction_date: dayjs(e.toJSON().transaction_date?.iso).format('YYYY/MM/DD')
                            }
                        })
                        handleDataFilter(data)
                        return {data, total: result.count, success: true,}
                    }}

                    pagination={{pageSize: 6,}}


                    renderItem={(item) => {
                        const amount = parseAmount(item.amount)
                        return (
                            <Card key={item.objectId} className={classCard}>
                                <Row>
                                    <Col span={13}>
                                        <div>
                                            <Space>
                                                <h3 className={'text-slate-600'}>{item.name}</h3>
                                                {item?.category?.icon ? (
                                                    <Tooltip placement="topLeft" title={item?.category?.name}>
                                                        <img src={item?.category?.icon?.url} alt={'icon'} width={24}
                                                             height={24}/>
                                                    </Tooltip>
                                                ) : (
                                                    <span className={'text-slate-400 text-sm ml-2'}>
                                                {item?.category?.name}
                                            </span>
                                                )}
                                            </Space>
                                        </div>
                                        <span
                                            className={'font-light text-xs text-slate-400 '}>{item.transaction_date}</span>
                                    </Col>
                                    <Col span={5} offset={6} className={'flex items-center justify-end'}>
                                        <Space>
                                            <h3 className={'text-xl'}>
                                                {amount.integerPart.toLocaleString()}
                                                <span className={'text-gray-400'}>{amount.decimalPart}</span>
                                            </h3>
                                            <Dropdown menu={{items: generateItems(item)}} arrow trigger={['click']}>
                                                <DownOutlined/>
                                            </Dropdown>
                                        </Space>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    }}
                />
            </Content>
            <Modal title="E-Invoice" open={modalPDF.isOpen} onCancel={() => setModalPDF({isOpen: false})} width={1200}
                   footer={null}>
                <object type="application/pdf"
                        data={modalPDF.pdfUrl}
                        width="100%" height="650px">
                </object>


            </Modal>
        </>
    );
};

export default ZonePage;
