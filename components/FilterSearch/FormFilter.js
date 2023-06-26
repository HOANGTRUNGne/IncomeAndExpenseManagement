import React, {useContext} from 'react';
import {Button, DatePicker, Form, Select, Space} from "antd";
import {FilterContext} from "../FilterSearch/FilterContext";
import dayjs from "dayjs";

const {RangePicker} = DatePicker;
const tailLayout = {wrapperCol: {offset: 8, span: 8,},};
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

const FormFilter = (props) => {

    const {categoriesData = []} = props
    const contextFilter = useContext(FilterContext)
    const {handleFilter} = contextFilter
    const [form] = Form.useForm();
    const finish = (fieldsValue) => {
        const rangeValue = fieldsValue['transaction_date']
        const values = rangeValue ?
            {
                ...fieldsValue,
                transaction_date: [rangeValue[0].toDate(), rangeValue[1].toDate()],
            }
            : {...fieldsValue}
        if(values.category === undefined && values.transaction_date === undefined){``
            handleFilter(values, false)
        }else {
            handleFilter(values, true)
        }
    }
    const handleReset = () => {
        form.resetFields()
        handleFilter({}, false)
    }

    return (
        <>
            <h2>Filter</h2>
            <Form
                name="basic" form={form} onFinish={finish}
                labelCol={{span: 8}} wrapperCol={{span: 16}}
            >

                <Form.Item label={'Category'} name={'category'}>
                    <Select style={{width: 265}} placeholder={'Select category'} options={categoriesData} allowClear/>
                </Form.Item>

                <Form.Item name="transaction_date" label="Range Date">
                    <RangePicker presets={rangePresets}/>
                </Form.Item>

                <Form.Item  {...tailLayout}>
                    <Space>
                        <Button onClick={() => handleReset()}>Reset</Button>
                        <Button type="primary" htmlType="submit">Filter</Button></Space>
                </Form.Item>
            </Form>
        </>
    );
};

export default FormFilter;