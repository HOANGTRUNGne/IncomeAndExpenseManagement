import {SessionProvider} from 'next-auth/react';
import {EmptyLayout} from '~/components/layout/EmptyLayout';
import {AppPropsWithLayout} from '~/models';
import {ConfigProvider} from 'antd';
import '~/styles/globals.css';
import enUS from 'antd/locale/en_US';
import Authentication, {AuthContext} from '../components/auth'
import React, {useContext} from "react";


const App = ({Component, pageProps: {session, ...pageProps}}) => {
    const Layout = Component.Layout ?? EmptyLayout;

    return (
        <ConfigProvider locale={enUS} theme={{token: {colorPrimary: '#00b96b',},}}>
            <SessionProvider session={pageProps.session}>
                <Authentication>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Authentication>

            </SessionProvider>
        </ConfigProvider>
    );

}

export default App;
