import React, {useRef, useState} from 'react';
import ZoneBar from './ZoneBar';
import ZonePage from './ZonePage';
import {create, removeRowById, updateRowById} from '../../parse_server/index';
import {Layout} from "antd";

const Income = (props) => {
    const {incomeExpenditureData, ...rest} = props
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});


    const actionRef = useRef()
    const createIncome = async (values) => {

        await create('RevenueExpenditure', {
            ...values,
        });
        actionRef.current.reload();
    };

    const updateIncome = async (values, id) => {
        await updateRowById('RevenueExpenditure', id, values);
        actionRef.current.reload();

    };

    const handleDelete = async (id) => {
        await removeRowById('RevenueExpenditure', id);
        actionRef.current.reload();

    };

    return (
        <Layout>

            <ZoneBar
                {...{
                    title: 'Incomes',
                    titleAdd: 'Add Incomes',
                    titleUpdate: 'Update Incomes',
                    onUpdate: updateIncome,
                    onCreate: createIncome,
                    setEditing, editing, ...rest
                }}/>
            <ZonePage
                {...{
                    setEditing,
                    handleClickDelete: handleDelete, typeCategory: 'Incomes',
                    classCard: 'border-s-emerald-500 border-2', actionRef,
                }}
            />

        </Layout>
    );
};

export default Income;
