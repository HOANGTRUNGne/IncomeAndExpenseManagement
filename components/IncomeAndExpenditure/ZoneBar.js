import React, {useState} from 'react';
import {Button, ConfigProvider, Layout} from 'antd';
import PlusIcon from "~/public/images/PlusIcon";
import ModalForm from "./ModalForm";

const {Header} = Layout;


const ZoneBar = (props) => {
    const {title, titleUpdate, titleAdd, onCreate, onUpdate, setEditing, editing} = props

    return (
        <>
            <div className={'relative px-8 py-5'}>
                <div className={'absolute inset-x-0 bottom-0 h-px bg-slate-900/20'} />
                <div className={'flex items-center justify-between'}>
                    <p className={'text-3xl font-extralight text-slate-500'}>{title}</p>
                    <Button type="link" onClick={() => setEditing({isOpen: true})}> <PlusIcon
                        style={{color: '#2bc48a', fontSize: '20px',}}/></Button>
                </div>
            </div>


            <ModalForm {...{title,titleUpdate: titleUpdate, titleAdd: titleAdd, setEditing, onCreate, onUpdate, editing}}/>
        </>
    );
};
export default ZoneBar;
