import React from 'react';
import {Space, Table, Tag} from 'antd';

const TableCategories = (props) => {
    const {categoriesData = [], setEditingCategories, handleDelete: handleClickDelete} = props
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (_, record) => {
                const icon = record.icon?.url
                 return icon ? <img src={icon} alt={'icon'} width={32} height={32}/> : null
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => setEditingCategories({record: record, isOpen: true})}>Edit</a>
                    <a onClick={() => handleClickDelete(record.objectId)}>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table rowKey={record => record.objectId} columns={columns} dataSource={categoriesData}/>
        </>
    );
};

export default TableCategories;