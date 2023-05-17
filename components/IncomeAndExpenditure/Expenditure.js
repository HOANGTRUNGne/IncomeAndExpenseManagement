import React, {useRef, useState} from 'react';
import ZoneBar from "./ZoneBar";
import ZonePage from "./ZonePage";
import {create, removeRowById, updateRowById} from "../../parse_server";
import {Layout} from "antd";

const Expenditure = (props) => {
    const {incomeExpenditureData, ...rest} = props
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});

    const actionRef = useRef()

    const createSpendings = async (values) => {
        await create('RevenueExpenditure', values);
        actionRef.current.reload();
    };

    const updateSpendings = async (values, id) => {
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
                    title: 'Spendings',
                    titleAdd: 'Add Spendings',
                    titleUpdate: 'Update Spendings',
                    onUpdate: updateSpendings,
                    onCreate: createSpendings,
                    setEditing, editing, ...rest
                }}
            />
            <ZonePage {...{
                 setEditing, typeCategory: 'Spendings',
                handleClickDelete: handleDelete, classCard: 'border-s-rose-500 border-2', actionRef
            }} />
        </Layout>
    );
};

export default Expenditure;