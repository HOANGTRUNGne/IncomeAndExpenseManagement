import React from 'react';
import {Button, Card, Checkbox, Col, DatePicker, Row, Select} from "antd";

const {RangePicker} = DatePicker;
import dayjs from "dayjs";
import {PlusOutlined} from "@ant-design/icons";


const TransactionsFilter = () => {
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    const onChangeType = () =>{


    }

    const rangePresets = [
        {
            label: 'This Months',
            value: [dayjs().startOf("month"), dayjs().endOf("date")],
        },
        {
            label: 'Last Month',
            value: [dayjs().subtract(1, 'month').startOf("month"), dayjs().subtract(1, 'month').endOf("month")],
        },
        {
            label: 'This Quarter',
            value: [dayjs().startOf('quarter'), dayjs().endOf('quarter')],
        },
        {
            label: 'Last Quarter',
            value: [dayjs().subtract(1, 'quarter').startOf('quarter'), dayjs().subtract(1, 'quarter').endOf('quarter')],
        },
    ]
    return (
        <>

            <Card className={'w-11/12 mt-[70px]'}>
                <h3 className={'mb-2'}>Filter by Status</h3>
                <Checkbox.Group style={{width: '100%',}} onChange={onChange}>
                    <Row>
                        <Col span={24} className={'justify-between flex'}>
                            <Checkbox value="Processing">Processing</Checkbox>
                            <span>(5)</span>
                        </Col>

                        <Col span={24} className={'justify-between flex'}>
                            <Checkbox value="Completed">Completed</Checkbox>
                            <span>(7)</span>
                        </Col>

                        <Col span={24} className={'justify-between flex'}>
                            <Checkbox value="Cancelled">Cancelled</Checkbox>
                            <span>(3    )</span>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Card>

            <Card className={'w-11/12 mt-5'}>
                <h3 className={'mb-2'}>Filter by type</h3>
                <Select allowClear defaultValue="all" style={{width: 120,}}
                        options={[
                            {value: 'all', label: 'All',},
                            {value: 'Incomes', label: 'Incomes',},
                            {value: 'spendings', label: 'Spendings',},
                        ]}
                />
            </Card>
            <Card className={'w-11/12 mt-5'}>
                <h3 className={'mb-2'}>Filter by transactions day</h3>
                <RangePicker presets={rangePresets}/>
            </Card>
        </>

    );
};

export default TransactionsFilter;