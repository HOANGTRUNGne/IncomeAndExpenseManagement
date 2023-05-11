import React, {useEffect, useState} from 'react';
import {MainLayout} from "../components/layout";
import Home from "./index";
import {Breadcrumb, Button, Col, ConfigProvider, Layout, Menu, Row, Space, theme} from "antd";
import TableCategories from "../components/category/TableCategories";
import FormCategories from "../components/category/FormCategories";
import {
    DownloadOutlined,
    PlusOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {create, fetchData, removeRowById, updateRowById} from "../parse_server";

const {Header, Sider, Content} = Layout;

const Category = () => {
    const {token: {colorBgContainer},} = theme.useToken();
    const [editingCategories, setEditingCategories] = useState({record: {}, isOpen: false})
    const [categoriesData, setCategoriesData] = useState([])


    const fetchCategoriesData = async () => {
        const results = await fetchData('Categories');
        setCategoriesData(results.map((e) => e.toJSON()));
    };

    useEffect(() => {
        fetchCategoriesData();
    }, []);

    const onFinish = async (values) => {
        console.log(values)
        const {objectId} = values
        objectId ? await updateRowById('Categories', objectId, values) : await create('Categories', values);
        setEditingCategories({isOpen: false})
        fetchCategoriesData()
    }
    const handleDelete = async (id) => {
        await removeRowById('Categories', id);
        fetchCategoriesData();
    }

    return (
        <div class={'container mx-auto mt-10'}>

            <Layout>
                <Content style={{padding: '0 50px',}}>

                    <Layout style={{padding: '24px 0', background: colorBgContainer,}}>

                        <Content style={{padding: '0 24px', minHeight: 280,}}>
                            <Header style={{padding: 0, background: colorBgContainer,}}>
                                <div class={'flex justify-between items-center'}>
                                    <h3>Categories</h3>
                                    <Space size={15}>
                                        <Button type={"primary"}
                                                onClick={() => setEditingCategories({isOpen: true})}><PlusOutlined/> New
                                            Category</Button>
                                    </Space>
                                </div>
                            </Header>

                            <FormCategories {...{
                                editingCategories,
                                setEditingCategories,
                                onFinish,
                            }}/>
                            <TableCategories {...{setEditingCategories, categoriesData, handleDelete}}/>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </div>
    );
};

export default Category;

Category.Layout = MainLayout;


