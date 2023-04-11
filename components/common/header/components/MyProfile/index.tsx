import { Avatar, Popover } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { APP_ROUTES } from '~/constant';

export interface MyProfileProps {}

export default function MyProfile(props: MyProfileProps) {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const contents = () => (
        <ul className="m-0 list-none p-0">
            <li>My Profile</li>
            <li>
                <Link href={APP_ROUTES.SIGNIN}>Logout</Link>
            </li>
        </ul>
    );

    return (
        <Popover content={contents} trigger="click" open={open} onOpenChange={handleOpenChange}>
            <Avatar className="ml-4 cursor-pointer"></Avatar>
        </Popover>
    );
}
