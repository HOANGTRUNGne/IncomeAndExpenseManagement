import React, {useEffect, useState} from 'react';
import ZoneBar from './ZoneBar';
import ZonePage from './ZonePage';
import {create, fetchData, removeRowById, updateRowById} from '../../parse_server/index';
import {Layout} from "antd";

const {Header} = Layout;

const Income = (props) => {
    const {fetchIncomeExpenditureData:fetchIncomesData, incomeExpenditureData} = props
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});

    const createIncome = async (values) => {
        await create('RevenueExpenditure', values);
        fetchIncomesData();
    };

    const updateIncome = async (values, id) => {
        await updateRowById('RevenueExpenditure', id, values);
        fetchIncomesData();
    };

    const handleDelete = async (id) => {
        await removeRowById('RevenueExpenditure', id);
        fetchIncomesData();
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
                    setEditing, editing,
                }}/>
            <ZonePage
                {...{
                    data: incomeExpenditureData, setEditing,
                    handleClickDelete: handleDelete, typeCategory:'Incomes',
                    classCard: 'border-s-emerald-500',
                }}
            />
        </Layout>
    );
};

export default Income;
