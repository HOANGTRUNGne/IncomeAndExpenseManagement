import { LayoutProps } from '~/models';
// import { Footer } from "../common/footer";
import { Header } from '../common/header';
import { Layout } from 'antd';
const { Content } = Layout;

export function MainLayout({ children }: LayoutProps) {
    return (
        <Layout className="h-screen">
            <Header />
            <Content>
                <div className="">{children}</div>
            </Content>
        </Layout>
    );
}
