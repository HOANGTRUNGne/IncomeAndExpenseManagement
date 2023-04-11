import { BellOutlined, MailOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Layout, Menu, Tooltip } from 'antd';
const { Header } = Layout;
const { Search } = Input;

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
    return (
        <Header className="flex w-full justify-between bg-white px-5">
            <div>
                <div className="logo" />
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={new Array(5).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                />
            </div>

            <div className="flex items-center">
                <Search className="w-[165px]" placeholder="input search text" />

                <Tooltip title="Ant User">
                    <Button shape="circle" className="ml-2">
                        <MailOutlined />
                    </Button>
                </Tooltip>

                <Button shape="circle" className="ml-2">
                    <BellOutlined />
                </Button>

                <Avatar className="ml-2"></Avatar>
            </div>
        </Header>
    );
}
