import React, {useContext} from 'react';
import {signIn, signOut, useSession} from 'next-auth/react';
import {MainLayout} from '~/components/layout';
import {getToken} from 'next-auth/jwt';
import IncomeAndExpenditure from '../components/IncomeAndExpenditure/index'
import {AuthContext} from "../components/auth";
import Transactions from "./transactions";

const Home = () => {
    // const session = useSession();
    // console.log('🏆 ~ Home ~ session:', session);
    const contextAuth = useContext(AuthContext)
    const {roleUser} = contextAuth
    return (
        <>

            {roleUser.includes('MANAGER') ?
                <IncomeAndExpenditure/> :
                <Transactions />
            }
        </>
    );
};

export default Home;

Home.Layout = MainLayout;
