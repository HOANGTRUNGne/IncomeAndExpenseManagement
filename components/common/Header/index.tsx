import { MenuProps } from 'antd';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { CloudOutlined, CustomerServiceOutlined } from '@ant-design/icons';

export function Header() {
    const items: MenuProps['items'] = [
        {
            key: 'application',
            label: 'Application',
            children: [
                {
                    icon: <CloudOutlined />,
                    key: 'crypto',
                    label: 'Crypto',
                },
                {
                    icon: <CustomerServiceOutlined />,
                    key: 'crm',
                    label: 'CRM',
                },
            ],
        },
        {
            key: 'apps',
            label: 'Apps',
        },
        {
            key: 'libs',
            label: 'Libs',
        },
        {
            key: 'components',
            label: 'Components',
        },
    ];

    return (
        <>
            <HeaderMobile items={items} />
            <HeaderDesktop items={items} />
        </>
    );
}
