import Image from 'next/image';
import { IMAGES } from '~/public/images';
import { Message, MyProfile, Notification } from './components';
import { Button, Input, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Search } = Input;

export interface HeaderMobileProps {}

export function HeaderMobile(props: HeaderMobileProps) {
    return (
        <Header className="bg-white px-5 lg:hidden">
            <div className="m-auto flex h-full items-center justify-between">
                <div className="flex">
                    <Button type="ghost" className="p-1">
                        <MenuOutlined className="text-lg" />
                    </Button>
                    <Image src={IMAGES.logoWithName} alt="logo" width={84} height={36} className="ml-5" />
                </div>

                <div className="flex items-center">
                    <Search className="w-[140px] transition-all sm:w-[165px]" placeholder="Search here" />

                    <div className="hidden sm:block">
                        <Message />

                        <Notification />
                    </div>

                    <MyProfile />
                </div>
            </div>
        </Header>
    );
}
