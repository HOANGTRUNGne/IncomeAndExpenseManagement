import {LayoutProps} from '~/models';
import {Layout} from 'antd';
import {Header} from '../common/Header';

const {Content} = Layout;

export function MainLayout({children}: LayoutProps) {
    return (
            <Layout className="h-screen">
                <Header/>
                <Content>{children}</Content>
            </Layout>

    );
}
