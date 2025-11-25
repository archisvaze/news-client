/* eslint-disable react-hooks/exhaustive-deps */
import { List, Spin } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { LOCATION_MAP } from '../location';
import Nav from './Nav';
import RegionPicker from './RegionPicker';
import Search from './Search';

export default function News(props) {
    const { bgColor } = props;

    const [news, setNews] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [topicKey, setTopicKey] = useState('home');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [location, setLocation] = useState('US-en');

    async function fetchNews(search, locale, topicId) {
        try {
            setIsLoading(true);

            let url = '/api/news';
            let hasParams = false;

            const { hl, gl, ceid } = LOCATION_MAP[locale];

            if (search) {
                url += `?search=${encodeURIComponent(search)}`;
                hasParams = true;
            }

            if (topicId) {
                url += hasParams ? `&topicId=${topicId}` : `?topicId=${topicId}`;
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
            const slicedNews = data?.items?.slice(0, 15);
            setNews(slicedNews);
            scrollToTop();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        fetchNews(null, location, null);
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <Spin
                size='large'
                spinning={isLoading}
                fullscreen
            />
            <div
                className='shadow'
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    background: bgColor,
                    zIndex: '10',
                }}
            >
                <Nav
                    onChange={(topicId) => {
                        setSearchQuery('');
                        fetchNews(null, location, topicId);
                    }}
                    topicKey={topicKey}
                    setTopicKey={setTopicKey}
                />
                <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'stretch', gap: '12px' }}>
                    <Search
                        onSearch={(query) => {
                            setTopicKey('');
                            fetchNews(query, location, null);
                        }}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <RegionPicker
                        location={location}
                        setLocation={(newLocation) => {
                            setLocation(newLocation);
                            fetchNews(searchQuery, newLocation, topicKey);
                        }}
                    />
                </div>
            </div>

            <main style={{ paddingTop: '144px' }}>
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
                                            rel='noreferrer'
                                        >
                                            {item.title}
                                        </a>
                                    }
                                    description={
                                        <span style={{ marginBottom: '12px' }}>{localDate.format('dddd, MMMM Do YYYY, h:mm a')}</span>
                                    }
                                />
                                {item.contentSnippet}
                            </List.Item>
                        );
                    }}
                />
            </main>
        </div>
    );
}
