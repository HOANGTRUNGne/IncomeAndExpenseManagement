import React, {useEffect, useState} from 'react';
import Income from "./Income";
import Balance from "./Balance";
import Expenditure from "./Expenditure";
import {fetchData} from "../../parse_server";
import {Col, Row} from "antd";

const IncomeAndExpenditure = () => {
    const [incomeExpenditureData, setIncomeExpenditureData] = useState([])

    const fetchIncomeExpenditureData = async () => {
        const results = await fetchData('RevenueExpenditure');
        setIncomeExpenditureData(results.map((e) => e.toJSON()));
    };

    useEffect(() => {
        fetchIncomeExpenditureData();
    }, []);

    return (
        <Row className={'min-h-full'}>
            <Col span={8}><Income {...{fetchIncomeExpenditureData, incomeExpenditureData, setIncomeExpenditureData}}/></Col>
            <Col className={'shadow-xl bg-white'} span={8}><Balance/></Col>
            <Col span={8}><Expenditure {...{fetchIncomeExpenditureData, incomeExpenditureData, setIncomeExpenditureData}}/></Col>
        </Row>
    );
};

export default IncomeAndExpenditure;