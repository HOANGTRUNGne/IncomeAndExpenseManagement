import { BellOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useState } from 'react';
import { ListItem } from '~/components/common/ListItem';

export default function Notification() {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <Popover
            title="NOTIFICATIONS(16)"
            content={<ListItem />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Button shape="circle" className="ml-4">
                <BellOutlined />
            </Button>
        </Popover>
    );
}
