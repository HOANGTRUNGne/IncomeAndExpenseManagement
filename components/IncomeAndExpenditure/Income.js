import React, {useContext, useRef, useState} from 'react';
import ZoneBar from './ZoneBar';
import ZonePage from './ZonePage';
import {create, removeRowById, updateRowById} from '../../parse_server/index';
import {Button, Layout} from "antd";
import PlusIcon from "~/public/images/PlusIcon";
import ModalForm from "~/components/IncomeAndExpenditure/IncomeExpenseForm";
import {FilterContext} from "~/components/FilterSearch/FilterContext";

const RenderActions = ({handleModalForm}) => {
    return (
        <Button type="link" onClick={() => handleModalForm()}>
            <PlusIcon style={{color: '#2bc48a', fontSize: '20px', margin: 0}}/>
        </Button>
    )
}

const Income = (props) => {
    const {incomeExpenditureData, fetchIncomeExpenditureData, ...rest} = props
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});

    const contextFilter = useContext(FilterContext)
    const {actionRefIncomes, handleDataIncomes, dataIncomes} = contextFilter
    const createIncome = async (values) => {
        await create('RevenueExpenditure', {
            ...values,
        });
        fetchIncomeExpenditureData()
        actionRefIncomes.current.reload();
    };
    const updateIncome = async (values, id) => {
        await updateRowById('RevenueExpenditure', id, values);
        actionRefIncomes.current.reload();
        fetchIncomeExpenditureData()

    };
    const deleteIncome = async (id) => {
        await removeRowById('RevenueExpenditure', id);
        fetchIncomeExpenditureData()
        actionRefIncomes.current.reload();
    };
    const handleModalForm = () => {
        setEditing({isOpen: !(editing.isOpen)})
    }
    const handleEdit = (record) => {
        setEditing({selectRecord: record, isOpen: true})
    }

    return (
        <Layout>

            <ZoneBar
                {...{
                    title: 'Incomes',
                    action: <RenderActions {...{handleModalForm}}/>,
                    modalForm: <ModalForm {...{
                        type: 'Incomes',
                        onUpdate: updateIncome,
                        onCreate: createIncome,
                        editing, handleModalForm, ...rest
                    }}/>,

                }} />
            <ZonePage
                {...{
                    handleClickEdit: handleEdit, handleDataFilter: handleDataIncomes,
                    handleClickDelete: deleteIncome, typeCategory: 'Incomes',
                    classCard: 'border-s-emerald-500 border-2', actionRef: actionRefIncomes,
                }}
            />

        </Layout>
    );
};

export default Income;
