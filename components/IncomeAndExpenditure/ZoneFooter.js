import React from 'react';
import {Divider, Layout, Space} from "antd";
import {parseAmount} from "~/utils";

const {Footer} = Layout;

const GrandTotal = ({value, title, classTitle, classTotal, classTotalSpan}) => {
    const amount = parseAmount(value)

    return (
        <div className={'flex justify-between'}>
            <p className={`text-base font-light  ${classTitle}`}>{title}:</p>
            <h3 className={classTotal}>
                {amount.integerPart.toLocaleString()}
                <span className={classTotalSpan}>{amount.decimalPart}</span>
            </h3>
        </div>
    )
}


const ZoneFooter = (props) => {
    const {overall, incomes, spendings} = props
    return (
        <Footer className={'relative px-8'}>
            {/*<div className={'absolute inset-x-0 top-0 h-px bg-slate-900/20'}/>*/}
            <Divider orientation="left">Total amount</Divider>
            <Space direction="vertical" size="small" className={"flex"}>
                <GrandTotal {...{
                    title: 'Incomes',
                    classTitle: 'text-slate-500',
                    classTotal: 'text-base',
                    classTotalSpan: 'text-gray-400',
                    value: incomes
                }} />
                <GrandTotal {...{
                    title: 'Spendings',
                    classTitle: 'text-slate-500',
                    classTotal: 'text-base',
                    classTotalSpan: 'text-gray-400',
                    value: spendings
                }} />
                <GrandTotal {...{
                    title: 'Overall balance',
                    classTitle: 'font-bold',
                    classTotal: 'text-2xl text-emerald-500',
                    classTotalSpan: 'font-thin',
                    value: overall
                }} />
            </Space>
        </Footer>
    );
};

export default ZoneFooter;