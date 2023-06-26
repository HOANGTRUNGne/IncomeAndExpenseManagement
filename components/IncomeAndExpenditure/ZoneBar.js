import React from 'react';
import {Button, Layout} from 'antd';
import PlusIcon from "~/public/images/PlusIcon";
import IncomeExpenseForm from "./IncomeExpenseForm";



const ZoneBar = (props) => {
    const {title, onCreate, onUpdate, action, modalForm, ...rest} = props
    return (
        <>
            <div className={'relative px-8 py-5'}>
                <div className={'absolute inset-x-0 bottom-0 h-px bg-slate-900/20'} />
                <div className={'flex items-center justify-between'}>
                    <p className={'text-3xl font-extralight text-slate-500'}>{title}</p>
                    {action}
                </div>
            </div>

            {modalForm}


        </>
    );
};
export default ZoneBar;
