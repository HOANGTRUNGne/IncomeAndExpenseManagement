import { MailOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useState } from 'react';
import { ListItem } from '~/components/common/ListItem';

export default function Message() {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <Popover
            title="MESSAGES(12)"
            content={<ListItem />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Button shape="circle" className="ml-4">
                <MailOutlined />
            </Button>
        </Popover>
    );
}
