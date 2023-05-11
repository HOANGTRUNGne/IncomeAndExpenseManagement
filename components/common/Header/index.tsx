import { MenuProps } from 'antd';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { CloudOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import Link from "next/link";

export function Header() {
    const items: MenuProps['items'] = [
        {
            key: 'Home',
            label: (<Link href={'/'}>Home</Link>),

        },
        {
            key: 'category',
            label: (<Link href={'/category'}>Category</Link>)
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
