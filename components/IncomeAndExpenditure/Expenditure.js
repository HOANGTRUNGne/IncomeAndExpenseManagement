import React, { useState} from 'react';
import ZoneBar from "./ZoneBar";
import ZonePage from "./ZonePage";
import {create, removeRowById, updateRowById} from "../../parse_server";

const Expenditure = (props) => {
    const {fetchIncomeExpenditureData: fetchSpendingsData, incomeExpenditureData,...rest} = props
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});


    const createSpendings = async (values) => {
        await create('RevenueExpenditure', values);
        fetchSpendingsData();
    };

    const updateSpendings = async (values, id) => {
        await updateRowById('RevenueExpenditure', id, values);
        fetchSpendingsData();
    };

    const handleDelete = async (id) => {
        await removeRowById('RevenueExpenditure', id);
        fetchSpendingsData();
    };
    return (
        <>
            <ZoneBar
                {...{
                    title: 'Spendings',
                    titleAdd: 'Add Spendings',
                    titleUpdate: 'Update Spendings',
                    onUpdate: updateSpendings,
                    onCreate: createSpendings,
                    setEditing, editing, ...rest
                }}
            />
            <ZonePage {...{
                data: incomeExpenditureData, setEditing, typeCategory:'Spendings',
                handleClickDelete: handleDelete, classCard: 'border-s-rose-500'
            }} />
        </>
    );
};

export default Expenditure;