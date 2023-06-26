import React, {useContext} from 'react';
import ZoneBar from "./ZoneBar";
import {Button, Card, Col, Layout, Row} from "antd";
import ZoneFooter from "~/components/IncomeAndExpenditure/ZoneFooter";
import FormFilter from "~/components/FilterSearch/FormFilter";
import {FilterContext} from "~/components/FilterSearch/FilterContext";
import Increase from "~/assets/icons/Increase";
import Decrease from "~/assets/icons/Decrease";
import {calcTotalAmount, parseAmount} from "~/utils";
import {CSVLink} from "react-csv";
import Excel from "~/assets/icons/Excel";

const {Content} = Layout;
const CardTotal = ({value, title, children}) => {
    const amount = parseAmount(value)
    return (
        <Card>
            <h4 className={'text-gray-400'}>{title}</h4>
            <div className={'flex justify-between'}>
                <h3>
                    {amount.integerPart.toLocaleString()}
                    <span>{amount.decimalPart}</span>
                </h3>
                {children}
            </div>
        </Card>
    )
}

const headerCsv = [
    {label: "Id", key: "objectId"},
    {label: "Name", key: "name"},
    {label: "Amount", key: "amount"},
    {label: "Type", key: "type"},
    {label: "Transaction Date", key: "transaction_date"},
];

const Balance = (props) => {
    const {incomeExpenditureData, ...rest} = props
    const contextFilter = useContext(FilterContext)
    const {isTotal, dataIncome: dataIncomeByFilter, dataSpending: dataSpendingByFilter} = contextFilter
    const csvData = [...dataIncomeByFilter, ...dataSpendingByFilter]
    const incomes = calcTotalAmount(incomeExpenditureData.filter(e => e.type === 'Incomes'))
    const spendings = calcTotalAmount(incomeExpenditureData.filter(e => e.type === 'Spendings'))
    const incomeByFilter = calcTotalAmount(dataIncomeByFilter)
    const spendingByFilter = calcTotalAmount(dataSpendingByFilter)
    const overall = incomes - spendings
    const overallByFilter = incomeByFilter - spendingByFilter
    const amountOverall = parseAmount(overallByFilter)


    return (
        <>
            <ZoneBar {...{title: 'Options'}}/>

            <div className={'flex flex-col justify-between h-[calc(100%-75px)]'}>
                <Content className={'px-8 pt-3'}>
                    <FormFilter {...{...rest}} />

                    {isTotal && <Card>
                        <Row>
                            <Col span={16}><h4 className={'text-gray-400'}>Balance</h4>
                                <h3 className={'text-4xl pt-2 pb-5'}>
                                    ${amountOverall.integerPart.toLocaleString()}
                                    <span>{amountOverall.decimalPart}</span>
                                </h3>
                            </Col>
                            <Col span={5} offset={3}>
                                <CSVLink
                                    filename={"Balance_sheet.csv"}
                                    headers={headerCsv}
                                    data={csvData}>
                                    <Button icon={<Excel/>}>Export</Button>
                                </CSVLink>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <CardTotal {...{
                                    value: incomeByFilter,
                                    title: 'Income',
                                    children: <Increase style={{fontSize: '25px'}}/>
                                }}/>
                            </Col>

                            <Col span={12}>
                                <CardTotal {...{
                                    value: spendingByFilter,
                                    title: 'Spendings',
                                    children: <Decrease style={{fontSize: '25px'}}/>
                                }}/>
                            </Col>
                        </Row>
                    </Card>}
                </Content>

                <ZoneFooter {...{overall, incomes, spendings}}/>
            </div>
        </>
    )
        ;
};

export default Balance;