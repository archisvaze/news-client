/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, List, Spin } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { LOCATION_MAP } from '../location';
import Nav from './Nav';
import RegionPicker from './RegionPicker';
import Search from './Search';

export default function News({ bgColor }) {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [topicKey, setTopicKey] = useState('home');
    const [topicId, setTopicId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('US-en');

    async function fetchNews({ search, locale, topicId }) {
        try {
            setIsLoading(true);
            setError(null);

            const region = LOCATION_MAP[locale];
            if (!region) {
                throw new Error(`Invalid region: ${locale}`);
            }

            const { hl, gl, ceid } = region;

            const params = new URLSearchParams();

            if (search) params.append('search', search);
            if (topicId) params.append('topicId', topicId);

            params.append('hl', hl);
            params.append('gl', gl);
            params.append('ceid', ceid);

            const url = `/api/news?${params.toString()}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network error: ${response.status}`);
            }

            const data = await response.json();

            if (!data?.items) {
                throw new Error('Invalid API response from RSS parser.');
            }

            setNews(data.items.slice(0, 15));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'Something went wrong fetching news.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNews({ search: null, locale: location, topicId: '' });
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
                    top: 0,
                    left: 0,
                    width: '100%',
                    background: bgColor,
                    zIndex: 10,
                }}
            >
                {/* TOPIC NAVIGATION */}
                <Nav
                    onChange={(realTopicId) => {
                        setSearchQuery('');
                        setTopicId(realTopicId); // <-- actual Google topic
                        fetchNews({
                            search: null,
                            locale: location,
                            topicId: realTopicId,
                        });
                    }}
                    topicKey={topicKey}
                    setTopicKey={setTopicKey}
                />
            </div>

            <div
                style={{
                    padding: '100px 24px 24px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    gap: '12px',
                }}
            >
                <Search
                    onSearch={(query) => {
                        setTopicKey(''); // remove active topic
                        setTopicId(null);
                        setSearchQuery(query);
                        fetchNews({
                            search: query,
                            locale: location,
                            topicId: null,
                        });
                    }}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <RegionPicker
                    location={location}
                    setLocation={(newLocation) => {
                        setLocation(newLocation);
                        fetchNews({
                            search: searchQuery,
                            locale: newLocation,
                            topicId: topicId || '',
                        });
                    }}
                />
            </div>

            <main style={{ paddingTop: '0' }}>
                {/* ERROR UI */}
                {error && (
                    <div style={{ margin: '24px' }}>
                        <Alert
                            message='Error Fetching News'
                            description={error}
                            type='error'
                            showIcon
                        />
                    </div>
                )}

                {/* NEWS LIST */}
                <List
                    size='large'
                    itemLayout='horizontal'
                    dataSource={news}
                    renderItem={(item) => {
                        const localDate = moment(item.pubDate).local();
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
                                {item?.contentSnippet}
                            </List.Item>
                        );
                    }}
                />
            </main>
        </div>
    );
}
