import { Avatar, Button, Divider, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DataType {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

export interface ListItemProps {}

export const ListItem = (props: ListItemProps) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div>
            <div id="scrollableDiv" className="h-[360px] w-[300px] overflow-y-auto overflow-x-hidden">
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} size="large" />}
                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
            <Button type="primary" block>
                View All
            </Button>
        </div>
    );
};
