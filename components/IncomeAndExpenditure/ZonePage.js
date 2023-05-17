import React, { useState} from 'react';
import {Card, Col, Dropdown, Layout, Modal, Button, Row, Space} from 'antd';
import {DownOutlined, PlusOutlined} from "@ant-design/icons";
import ProList from "@ant-design/pro-list";
import {fetchWithPagination} from "~/parse_server";

const {Content} = Layout;


const ZonePage = (props) => {
    const {handleClickDelete, setEditing, classCard = '', typeCategory = '', actionRef} = props
    const [modalPDF, setModalPDF] = useState({isOpen: false, pdfUrl: ''})

    const generateItems = (record) => {
        return [
            {label: <a onClick={() => setEditing({selectRecord: record, isOpen: true})}>Edit</a>, key: '0',},
            {label: <a onClick={() => setModalPDF({isOpen: true, pdfUrl: record?.invoice?.url})}>PDF</a>, key: '1',},
            {label: <a onClick={() => handleClickDelete(record.objectId)}>Remove</a>, key: '2',},
        ];
    }

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
                            customQuery: (query) => query.equalTo('type', typeCategory)
                        })
                        const data = result.results.map(e => {
                            return {...e.toJSON()}
                        })
                        return {
                            data,
                            total: result.count,
                            success: true,
                        }
                    }}

                    pagination={{pageSize: 6,}}

                    renderItem={(item) => {
                        const integerPart = Math.floor(item.amount);
                        const decimalPart = (item.amount - integerPart).toFixed(2).substr(1);
                        return (

                            <Card key={item.objectId} className={classCard}>
                                <Row>
                                    <Col span={13}>
                                        <div className={'flex'}>
                                            <h3 className={'text-slate-600'}>
                                                {item.description}
                                            </h3>
                                            {item?.category?.icon ? (
                                                <div class="group relative ml-2 ">
                                                <span
                                                    class="invisible cursor-pointer group-hover:visible absolute text-slate-400 text-sm">
                                                    {item?.category?.name}
                                                </span>
                                                    <img src={item?.category?.icon?.url} alt={'icon'} width={24}
                                                         height={24}
                                                         className={'group-hover:invisible absolute cursor-pointer'}/>
                                                </div>
                                            ) : (
                                                <span className={'text-slate-400 text-sm ml-2'}>
                                                {item?.category?.name}
                                            </span>
                                            )}
                                        </div>

                                        <span className={'font-light text-xs text-slate-400 '}>{item.trade_date}</span>
                                    </Col>
                                    <Col span={5} offset={6} className={'flex items-center justify-end'}>
                                        <Space>
                                            <h3 className={'text-xl'}>
                                                {integerPart.toLocaleString()}
                                                <span className={'text-gray-400'}>{decimalPart}</span>
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
                {modalPDF.pdfUrl ?
                    <object type="application/pdf"
                            data={modalPDF.pdfUrl}
                            width="100%" height="650px">
                    </object>
                    :
                    <div className={'flex flex-col items-center '}>
                        <h1>PDF not unavailable</h1>
                        <Button className={'my-4'}>Add an invoice for this record</Button></div>
                }
            </Modal>
        </>

    )
        ;
};

export default ZonePage;
