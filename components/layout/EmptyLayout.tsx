import { LayoutProps } from '~/models';
import * as React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

export function EmptyLayout({ children }: LayoutProps) {
    return (
        <Layout className="h-screen">
            <Content>{children}</Content>
        </Layout>
    );
}
