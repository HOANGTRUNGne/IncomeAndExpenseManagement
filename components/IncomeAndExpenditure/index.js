import React, {useEffect, useState} from 'react';
import Income from "./Income";
import Balance from "./Balance";
import Expenditure from "./Expenditure";
import {fetchData} from "../../parse_server";
import {Col, Row} from "antd";
import {FilterProvider} from "../FilterSearch/FilterContext";


const IncomeAndExpenditure = () => {
    const [incomeExpenditureData, setIncomeExpenditureData] = useState([])
    const [categoriesData, setCategoriesData] = useState([])


    const fetchIncomeExpenditureData = async () => {
        const results = await fetchData('RevenueExpenditure');
        setIncomeExpenditureData(results.map((e) => e.toJSON()));
    };
    const fetchCategoriesData = async () => {
        const results = await fetchData('Categories');
        setCategoriesData(results.map((e) => {
            return {...e.toJSON(), value: e.toJSON().objectId, label: e.toJSON().name}
        }));
    }
    useEffect(() => {
        fetchIncomeExpenditureData();
        fetchCategoriesData()
    }, []);



    return (
        <FilterProvider>
            <Row className={'h-full'}>
                <Col span={8}><Income {...{fetchIncomeExpenditureData, incomeExpenditureData, categoriesData}}/></Col>
                <Col className={'shadow-xl z-10'} span={8}  ><Balance {...{incomeExpenditureData, categoriesData}}/></Col>
                <Col span={8}>
                    <Expenditure {...{fetchIncomeExpenditureData, incomeExpenditureData, categoriesData}}/>
                </Col>
            </Row>
        </FilterProvider>
    );
};

export default IncomeAndExpenditure;