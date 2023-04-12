import { MailOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useState } from 'react';

export default function DropdownMobile() {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const contents = () => (
        <ul className="m-0 list-none p-0">
            <li>Message</li>
            <li>Notifications</li>
            <li>English</li>
        </ul>
    );

    return (
        <Popover
            content={contents}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            className="sm:hidden"
            arrow={false}
        >
            <Button shape="circle" className="ml-4 border-transparent bg-[#f4f7fe]">
                <MoreOutlined />
            </Button>
        </Popover>
    );
}
