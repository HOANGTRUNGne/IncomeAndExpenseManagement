import { signIn, signOut, useSession } from 'next-auth/react';
import { MainLayout } from '~/components/layout';
import { getToken } from 'next-auth/jwt';
import IncomeAndExpenditure from '../components/IncomeAndExpenditure/index'

export default function Home() {
    const session = useSession();
    console.log('🏆 ~ Home ~ session:', session);

    return (
        <>
            <IncomeAndExpenditure />
        </>
    );
}

Home.Layout = MainLayout;
