import {Avatar, Col, Divider, Dropdown, List, Popover, Row, Space} from 'antd';
import {useContext} from 'react';
import {AuthContext} from "../../../../auth";
import {PoweroffOutlined} from "@ant-design/icons";
import Link from "next/link";
import Parse from "parse";

const data = [
    {
        title: 'Coder',
    },
    {
        title: 'Ant Design Title 2',
    },

];

const MyProfile = (props) => {
    const auth = useContext(AuthContext)

    const items = [
        {
            // label:  <Link href="/profile">My Profile</Link>,
            label: <Row>
                <Col span={8}><Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"/></Col>
                <Col span={16}><h3>Coder</h3>
                    <p>coder@gmail.com</p>
                </Col>
            </Row>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <a onClick={auth.handleLogout}>Logout</a>,
            key: '1',
            icon: <PoweroffOutlined/>,
        },
    ];

    const currentUser =  Parse.User.current();
    // console.log(currentUser.toJSON())
    const contents = () => (

        <div className=" w-[300px] overflow-y-auto overflow-x-hidden">
            <List size={'large'}
                  itemLayout="horizontal"
                  dataSource={data}
                  header={
                      <List.Item>
                          <List.Item.Meta
                              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1}`}/>}
                              title={<h3>Coder</h3>}
                              description="coder@gmail.com"
                          />
                      </List.Item>
                  }
                  footer={
                      <List.Item  className={'px-4 py-0'}>
                          <Space onClick={auth.handleLogout} className={'cursor-pointer'} size={10}>
                                  <PoweroffOutlined/>
                                 <span className={'uppercase font-medium'}>Logout</span>
                          </Space>
                      </List.Item>
                  }

            />
        </div>
    );

    return (
        <Popover content={contents} trigger="click">
            <Avatar className="ml-4 cursor-pointer"
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"></Avatar>
        </Popover>
    );
}
export default MyProfile;
// const router = useRouter();
/*<Link href={APP_ROUTES.LOGIN}>Logout</Link>*/
