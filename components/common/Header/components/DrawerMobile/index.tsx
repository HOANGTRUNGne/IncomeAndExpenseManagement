import { Avatar, Divider, Drawer, Menu, MenuProps } from 'antd';

interface DrawerMobileProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    items: MenuProps['items'];
}

export default function DrawerMobile({ open, setOpen, items }: DrawerMobileProps) {
    return (
        <Drawer
            placement="left"
            closable={false}
            onClose={() => setOpen(false)}
            open={open}
            key="left"
            bodyStyle={{
                padding: 0,
            }}
            width={280}
        >
            <div className="flex items-center px-3 py-2">
                <Avatar size="large" />
                <div className="ml-4">
                    <h3>John Alex</h3>
                    <span>System Manager</span>
                </div>
            </div>
            <Divider className="my-0" />
            <Menu mode="inline" items={items} disabledOverflow={true} />
        </Drawer>
    );
}
