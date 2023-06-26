import React, {useContext, useRef, useState} from 'react';
import {Badge, Button, Col, Form, List, Row, Select, Space, message} from "antd";
import {CheckSquareFilled, DeleteFilled, PlusOutlined} from "@ant-design/icons";
import Images from "../../assets/icons/Images";
import {ProTable} from "@ant-design/pro-table";
import {create, fetchWithPagination, removeRowById, updateRowById} from "../../parse_server";
import dayjs from "dayjs";
import InvoiceForm from "./InvoiceForm";
import {AuthContext} from "../auth";
import DoneCheck from "../../assets/icons/DoneCheck";

const columns = (props) => {
    const {handleAction, getStatus, roleUser} = props

    return (
        [
            {title: 'Id', dataIndex: 'objectId', key: 'objectId',},
            {title: 'Name', dataIndex: 'name', key: 'name', width: '25%',},
            {title: 'Type', dataIndex: 'type', key: 'type',},
            {title: 'Status', key: 'state', render: (_, record) => getStatus(record.status),},
            {
                title: 'Actions', align: 'center', key: 'action', hideInTable: !(roleUser).includes('MANAGER'),
                render: (_, record) => (
                    <Space size={20}>
                        {record.status === 'Processing' ?
                            <><Button size={"small"}
                                      onClick={() => handleAction(record.objectId, true)}>Approve</Button>
                                <Button size={"small"} onClick={() => handleAction(record.objectId, false)}
                                        danger>Reject</Button> </>
                            :
                            <DoneCheck style={{width: '20px', height: '20px'}}/>

                        }
                    </Space>
                ),
            },
        ]
    )
};


const TransactionsManagement = (props) => {
    const {...rest} = props
    const contextAuth = useContext(AuthContext)
    const {roleUser} = contextAuth
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});


    const actionRefInvocie = useRef()

    const createInvoice = async (value) => {
        await create('RevenueExpenditure', {
            ...value,
        });
        actionRefInvocie.current.reload();
    }

    const updateInvoice = async (value, id) => {
        await updateRowById('RevenueExpenditure', id, value);
        actionRefInvocie.current.reload();
    }

    const deleteInvoice = async (id) => {
        await removeRowById('RevenueExpenditure', id)
        actionRefInvocie.current.reload()
    };

    const handleModalForm = () => {
        setEditing({isOpen: !(editing.isOpen)})
    }
    const handleAction = async (id, boolean) => {
        boolean ?
            await updateRowById('RevenueExpenditure', id, {status: 'Completed'}) :
            await updateRowById('RevenueExpenditure', id, {status: 'Cancelled'})
        actionRefInvocie.current.reload();
    }

    const getStatus = (status) => {
        const listStatus = {
            'Processing': <Badge color={'hwb(205 6% 9%)'} text={status}/>,
            'Completed': <Badge status="success" text={status}/>,
            'Cancelled': <Badge status="error" text={status}/>,
        }
        return listStatus[status]
    }
    return (
        <>
            <InvoiceForm {...{
                editing, title: 'Invoice',
                handleModalForm,
                onCreate: createInvoice,
                onUpdate: updateInvoice,
                ...rest
            }}/>

            <Col span={18} className={'my-5'}>
                <div className={'flex justify-between'}>
                    <h1>Transactions</h1>
                    <Button onClick={() => setEditing({isOpen: true})}
                            type="primary" icon={<PlusOutlined/>}>Add New</Button>
                </div>
            </Col>

            <Col span={18}>
                <ProTable
                    rowKey={record => record.objectId}
                    options={false} search={false}
                    columns={columns({...{handleAction, getStatus, roleUser}})}
                    actionRef={actionRefInvocie}
                    request={async (params = {}) => {
                        const {current, pageSize} = params
                        const result = await fetchWithPagination('RevenueExpenditure', {
                            pageSize,
                            currentPage: current,
                        })
                        const data = result.results.map(e => {
                            return {
                                ...e.toJSON(),
                                transaction_date: dayjs(e.toJSON().transaction_date?.iso).format('YYYY/MM/DD')
                            }
                        })
                        return {data, total: result.count, success: true,}
                    }}
                    pagination={{pageSize: 10,}}
                    defaultExpandAllRows
                    expandable={{
                        expandedRowRender: (record) => {
                            return (
                                <Row>
                                    <Col span={24}><h2>{record.name}</h2></Col>
                                    <Col span={9}>
                                        <div className={'h-[300px] w-full'}>
                                            {record.invoice ?
                                                <img src={record.invoice.url} alt={'invoice'}
                                                     className={'w-full h-full'}/> :
                                                <Images style={{width: '100%'}}/>}
                                        </div>
                                    </Col>
                                    <Col span={15}>
                                        <List className={'p-7'}
                                              dataSource={[1]}
                                              renderItem={() => (
                                                  <>
                                                      <List.Item>
                                                          <Col span={6}><p>Id:</p></Col>
                                                          <Col span={18}><span>{record.objectId}</span></Col>
                                                      </List.Item>

                                                      <List.Item>
                                                          <Col span={6}><p>Name:</p></Col>
                                                          <Col span={18}><span>{record.name}</span></Col>
                                                      </List.Item>

                                                      <List.Item>
                                                          <Col span={6}><p>Category:</p></Col>
                                                          <Col span={18}><span>{record.category.name}</span></Col>
                                                      </List.Item>

                                                      <List.Item>
                                                          <Col span={6}><p>Type:</p></Col>
                                                          <Col span={18}><span>{record.type}</span></Col>
                                                      </List.Item>

                                                      <List.Item>
                                                          <Col span={6}><p>Amount:</p></Col>
                                                          <Col span={18}> <span>{record.amount} VND</span></Col>
                                                      </List.Item>

                                                      <List.Item>
                                                          <Col span={6}><p>Date:</p></Col>
                                                          <Col span={18}>
                                                              <span>{record.transaction_date}</span></Col>
                                                      </List.Item>

                                                      <List.Item>
                                                          <Col span={6}><p>Status:</p></Col>
                                                          <Col span={18}>{getStatus(record.status)}</Col>
                                                      </List.Item>
                                                  </>
                                              )}
                                        />
                                    </Col>
                                    <Col span={8} offset={18}>
                                        {record.status === 'Processing' ? <Space>
                                            <Button onClick={() => setEditing({isOpen: true, selectRecord: record})}
                                                    type="primary" icon={<CheckSquareFilled/>}>Update</Button>
                                            <Button type="primary"
                                                    onClick={() => deleteInvoice(record.objectId, record.status)}
                                                    icon={<DeleteFilled/>} danger>Delete</Button>
                                        </Space> : null}
                                    </Col>
                                </Row>
                            )
                        }
                    }}
                />
            </Col>
        </>
    );
};

export default TransactionsManagement;