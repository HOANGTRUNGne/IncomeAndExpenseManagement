import { SessionProvider } from 'next-auth/react';
import { EmptyLayout } from '~/components/layout/EmptyLayout';
import { AppPropsWithLayout } from '~/models';
import '~/styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;

    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}

export default App;
