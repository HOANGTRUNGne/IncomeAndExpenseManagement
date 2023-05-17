import React, {useState} from 'react';
import ZoneBar from "./ZoneBar";
import {Layout} from "antd";
import ZoneFooter from "~/components/IncomeAndExpenditure/ZoneFooter";

const {Content} = Layout;


const Balance = (props) => {
    const {incomeExpenditureData} = props
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});

    const incomes = incomeExpenditureData.filter(e => e.type === 'Incomes').reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
    const spendings = incomeExpenditureData.filter(e => e.type === 'Spendings').reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
    const overall = incomes - spendings

    return (
        <>
            <ZoneBar {...{title: 'Balance', setEditing, editing,}}/>

            <div className={'flex flex-col justify-between h-[calc(100%-75px)]'}>
                <Content className={'px-8 pt-3'}>
                </Content>
                <ZoneFooter {...{overall, incomes, spendings}}/>
            </div>
        </>
    );
};

export default Balance;