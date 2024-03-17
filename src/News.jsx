import { List, Spin } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function News(props) {
    const { theme, setTheme } = props;

    const [news, setNews] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    async function fetchNews(search, hl, gl, ceid) {
        try {
            setIsLoading(true);

            let url = 'http://localhost:8000/news';
            let hasParams = false;

            if (search) {
                url += `?search=${encodeURIComponent(search)}`;
                hasParams = true;
            }

            if (hl) {
                url += hasParams ? `&hl=${hl}` : `?hl=${hl}`;
                hasParams = true;
            }

            if (gl) {
                url += hasParams ? `&gl=${gl}` : `?gl=${gl}`;
                hasParams = true;
            }

            if (ceid) {
                url += hasParams ? `&ceid=${ceid}` : `?ceid=${ceid}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setNews(data.items);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <Spin
                size='large'
                spinning={isLoading}
                fullscreen
            />

            <List
                size='large'
                itemLayout='horizontal'
                dataSource={news}
                renderItem={(item, index) => {
                    const gmtDateTime = moment(item.pubDate);
                    const localDate = gmtDateTime.local();
                    return (
                        <List.Item style={{ padding: '32px 24px' }}>
                            <List.Item.Meta
                                title={
                                    <a
                                        style={{ fontSize: '16px' }}
                                        href={item.link}
                                        target='_blank'
                                    >
                                        {item.title}
                                    </a>
                                }
                                description={<span style={{ marginBottom: '12px' }}>{localDate.format('dddd, MMMM Do YYYY, h:mm a')}</span>}
                            />
                            {item.contentSnippet}
                        </List.Item>
                    );
                }}
            />
        </div>
    );
}
