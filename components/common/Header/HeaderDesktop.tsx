import { CloudOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Input, Layout, Menu, MenuProps } from 'antd';
import { Message, MyProfile, Notification } from './components';
import Image from 'next/image';
import { IMAGES } from '~/public/images';
const { Header } = Layout;
const { Search } = Input;

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

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
    return (
        <Header className=" bg-white ">
            <div className="m-auto flex max-w-[1720px] justify-between">
                <div className="flex">
                    <div>
                        <Image src={IMAGES.logoWithName} alt="logo" width={84} height={36} />
                    </div>
                    <Menu
                        mode="horizontal"
                        selectedKeys={['application', 'crypto']}
                        items={items}
                        disabledOverflow={true}
                    />
                </div>

                <div className="flex items-center">
                    <Search className="w-[165px]" placeholder="Search here" />

                    <Message />

                    <Notification />

                    <MyProfile />
                </div>
            </div>
        </Header>
    );
}
