import React, {useEffect, useState} from 'react';
import {Col, Row} from "antd";
import {MainLayout} from "../components/layout";
import TransactionsManagement from "../components/transactions/TransactionsManagement";
import {fetchData} from "../parse_server";
import TransactionsFilter from "../components/transactions/TransactionsFilter";


const Transactions = () => {

    const [categoriesData, setCategoriesData] = useState([])

    const fetchCategoriesData = async () => {
        const results = await fetchData('Categories');
        setCategoriesData(results.map((e) => {
            return {...e.toJSON(), value: e.toJSON().objectId, label: e.toJSON().name}
        }));
    }
    useEffect(() => {
        fetchCategoriesData()
    }, []);


    return (
        <>
            <Row className={'mt-10'}>
                <Col span={4} offset={4}><TransactionsFilter/></Col>
                <Col span={16}><TransactionsManagement {...{categoriesData}}/></Col>
            </Row>
        </>
    );
};

export default Transactions;

Transactions.Layout = MainLayout;