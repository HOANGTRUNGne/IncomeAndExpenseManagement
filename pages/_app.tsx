import 'antd/dist/reset.css';
import { EmptyLayout } from '~/components/layout/EmptyLayout';
import { AppPropsWithLayout } from '~/models';
import '~/styles/globals.css';

function App({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default App;
