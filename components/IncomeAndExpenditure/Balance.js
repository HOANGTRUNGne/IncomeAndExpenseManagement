import React, {useState} from 'react';
import ZoneBar from "./ZoneBar";
import ZonePage from "./ZonePage";
import {Card, Col, Layout, Row, Space} from "antd";

const {Content, Footer} = Layout;

const GrandTotal = ({value, title, classTitle, classTotal, classTotalSpan}) => {
    const integerPart = Math.floor(value)
    const decimalPart = (value - integerPart).toFixed(2).substring(1)

    return (
        <div className={'flex justify-between'}>
            <p className={`text-base font-light  ${classTitle}`}>{title}:</p>
            <h3 className={classTotal}>
                {integerPart.toLocaleString()}
                <span className={classTotalSpan}>{decimalPart}</span>
            </h3>
        </div>
    )
}

const Balance = (props) => {
    const {incomeExpenditureData} = props
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});

    const incomes = incomeExpenditureData.filter(e => e.type === 'Incomes').reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
    const spendings = incomeExpenditureData.filter(e => e.type === 'Spendings').reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
    const totalmen = incomes - spendings

    return (
        <>
            <ZoneBar {...{title: 'Balance', setEditing, editing,}}/>

            <Layout className={'flex justify-between h-5/6 '}>
                <Content className={'px-8 pt-3'}>
                    {[1, 2, 3, 4].map(record => (
                        <Card key={record.objectId} className={`border-l-4 mt-2.5 `}>
                            <Row>
                                <Col span={12}>
                                    <h3 className={'text-slate-600'}>Monthly Bills</h3>
                                    <span className={'font-light text-xs text-slate-400'}>2023-04-16</span>
                                </Col>
                                <Col span={5} offset={7} className={'flex items-center justify-end'}>
                                    <Space>
                                        <h3 className={'text-xl'}>
                                            11.000
                                            <span className={'text-gray-300'}>.00</span>
                                        </h3>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>))}
                </Content>
                <Footer className={'relative px-8'}>
                    <div className={'absolute inset-x-0 top-0 h-px bg-slate-900/20'}/>
                    <Space direction="vertical" size="small" className={"flex"}>
                        <GrandTotal {...{
                            title: 'Incomes',
                            classTitle: 'text-slate-500',
                            classTotal: 'text-base',
                            classTotalSpan: 'text-gray-400',
                            value:incomes
                        }} />
                        <GrandTotal {...{
                            title: 'Spendings',
                            classTitle: 'text-slate-500',
                            classTotal: 'text-base',
                            classTotalSpan: 'text-gray-400',
                            value:spendings
                        }} />
                        <GrandTotal {...{
                            incomeExpenditureData,
                            title: 'Overall balance',
                            classTitle: 'font-bold',
                            classTotal: 'text-2xl text-emerald-500',
                            classTotalSpan: 'font-thin',
                            value:totalmen
                        }} />
                    </Space>
                </Footer>
            </Layout>

            .
        </>
    );
};

export default Balance;