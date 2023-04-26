import React, {useState} from 'react';
import ZoneBar from "./ZoneBar";
import ZonePage from "./ZonePage";
import {Card, Col, Dropdown, Layout, Row, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
const {Content} = Layout;

const Balance = () => {
    const [editing, setEditing] = useState({selectRecord: {}, isOpen: false});
    return (
        <>
            <ZoneBar {...{title: 'Balance',setEditing, editing,}}/>

            <Content className={'px-8 pt-3'}>
                {[1,2,3,4].map(record => (
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

            <div className={'px-8 pt-3'}>

            </div>
        </>
    );
};

export default Balance;