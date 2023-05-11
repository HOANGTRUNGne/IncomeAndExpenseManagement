import { Input, Layout, Menu, MenuProps } from 'antd';
import Image from 'next/image';
import { IMAGES } from '~/public/images';
import { Message, MyProfile, Notification } from './components';
import Link from "next/link";
const { Header } = Layout;
const { Search } = Input;

export interface HeaderDesktopProps {
    items: MenuProps['items'];
}

export function HeaderDesktop({ items }: HeaderDesktopProps) {
    return (
        <Header className="hidden bg-white lg:block">
            <div className="m-auto flex max-w-[1720px] justify-between">
                <div className="flex">
                    <Link href={'/'}>
                        <Image src={IMAGES.logoTemp} alt="logo" height={36} className="object-cover" />
                    </Link>
                    <Menu
                        mode="horizontal"
                        selectedKeys={['application', 'crypto']}
                        items={items}
                        disabledOverflow={true}
                        className="bg-transparent"
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
