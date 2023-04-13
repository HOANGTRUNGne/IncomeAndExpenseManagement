import { MenuOutlined } from '@ant-design/icons';
import { Button, Input, Layout, MenuProps } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { IMAGES } from '~/public/images';
import { DrawerMobile, DropdownMobile, Message, MyProfile, Notification } from './components';
const { Header } = Layout;
const { Search } = Input;

export interface HeaderMobileProps {
    items: MenuProps['items'];
}

export function HeaderMobile({ items }: HeaderMobileProps) {
    const [open, setOpen] = useState(false);

    return (
        <Header className="bg-white px-5 lg:hidden ">
            <div className="m-auto flex h-full items-center justify-between">
                <div className="flex">
                    <Button type="ghost" className="p-1" onClick={() => setOpen(true)}>
                        <MenuOutlined className="text-lg" />
                    </Button>
                    <Image
                        src={IMAGES.logoTemp}
                        alt="logo"
                        width={84}
                        height={36}
                        className="ml-5 hidden min-[380px]:block"
                    />
                </div>

                <div className="flex items-center">
                    <Search className="w-[140px] transition-all sm:w-[165px]" placeholder="Search here" />

                    <div className="hidden sm:block">
                        <Message />

                        <Notification />
                    </div>

                    <MyProfile />
                    <DropdownMobile />
                </div>
            </div>

            <DrawerMobile open={open} setOpen={setOpen} items={items} />
        </Header>
    );
}
