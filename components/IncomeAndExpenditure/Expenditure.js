import React, {useContext, useState} from 'react';
import ZoneBar from "./ZoneBar";
import ZonePage from "./ZonePage";
import {create, removeRowById, updateRowById} from "../../parse_server";
import {Button, Layout} from "antd";
import PlusIcon from "~/public/images/PlusIcon";
import IncomeExpenseForm from "~/components/IncomeAndExpenditure/IncomeExpenseForm";
import {FilterContext} from "~/components/FilterSearch/FilterContext";

const RenderActions = ({handleModalForm}) => {
    return (
        <Button type="link" onClick={() => handleModalForm()}>
            <PlusIcon style={{color: '#2bc48a', fontSize: '20px', margin: 0}}/>
        </Button>
    )
}
const Expenditure = (props) => {
    const {incomeExpenditureData, fetchIncomeExpenditureData, ...rest} = props
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});

    const contextFilter = useContext(FilterContext)
    const {handleDataSpending, actionRefSpendings} = contextFilter

    const createSpendings = async (values) => {
        await create('RevenueExpenditure', values);
        actionRefSpendings.current.reload();
    };
    const updateSpendings = async (values, id) => {
        await updateRowById('RevenueExpenditure', id, values);
        actionRefSpendings.current.reload();
    };
    const deleteSpending = async (id) => {
        await removeRowById('RevenueExpenditure', id);
        actionRefSpendings.current.reload();
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
                    title: 'Spendings',
                    action: <RenderActions {...{handleModalForm}}/>,
                    modalForm: <IncomeExpenseForm {...{
                        type: 'Spendings',
                        onUpdate: updateSpendings,
                        onCreate: createSpendings,
                        handleModalForm, editing, ...rest
                    }}/>,

                }}
            />
            <ZonePage {...{
                handleClickEdit: handleEdit,
                typeCategory: 'Spendings',
                handleDataFilter: handleDataSpending,
                handleClickDelete: deleteSpending,
                classCard: 'border-s-rose-500 border-2',
                actionRef: actionRefSpendings
            }} />
        </Layout>
    );
};

export default Expenditure;