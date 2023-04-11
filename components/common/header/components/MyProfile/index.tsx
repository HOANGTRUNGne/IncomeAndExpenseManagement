import { Avatar, Popover } from 'antd';
import { useState } from 'react';

export interface MyProfileProps {}

export default function MyProfile(props: MyProfileProps) {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const contents = () => (
        <ul className="m-0 list-none p-0">
            <li>My Profile</li>
            <li>Logout</li>
        </ul>
    );

    return (
        <Popover content={contents} trigger="click" open={open} onOpenChange={handleOpenChange}>
            <Avatar className="ml-4"></Avatar>
        </Popover>
    );
}
