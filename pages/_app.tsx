import { SessionProvider } from 'next-auth/react';
import { EmptyLayout } from '~/components/layout/EmptyLayout';
import { AppPropsWithLayout } from '~/models';
import { ConfigProvider } from 'antd';
import '~/styles/globals.css';
import enUS from 'antd/locale/en_US';

function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;

    return (
        <ConfigProvider locale={enUS}>
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
        </ConfigProvider>
    );

}

export default App;
