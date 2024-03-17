import { Menu } from 'antd';
import React from 'react';
import { BiSolidMoviePlay, BiWorld } from 'react-icons/bi';
import { IoMdHome } from 'react-icons/io';
import { MdSportsBaseball } from 'react-icons/md';
import { RiReactjsLine } from 'react-icons/ri';
import { TiWiFi } from 'react-icons/ti';

export default function Nav({ onChange, topicKey, setTopicKey }) {
    const items = [
        {
            label: 'Local',
            key: 'local',
            id: '',
            icon: <IoMdHome size={20} />,
        },
        {
            label: 'World',
            key: 'world',
            id: 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSlRpZ0FQAQ',
            icon: <BiWorld size={20} />,
        },
        {
            label: 'Technology',
            key: 'technology',
            id: 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ',
            icon: <TiWiFi size={20} />,
        },
        {
            label: 'Science',
            key: 'science',
            id: 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKSlRpZ0FQAQ',
            icon: <RiReactjsLine size={20} />,
        },
        {
            label: 'Sports',
            key: 'sports',
            id: 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ',
            icon: <MdSportsBaseball size={20} />,
        },
        {
            label: 'Entertainment',
            key: 'entertainment',
            id: 'CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSlRpZ0FQAQ',
            icon: <BiSolidMoviePlay size={20} />,
        },
    ];

    const onClick = (e) => {
        setTopicKey(e.key);
        const selectedItem = items.find((item) => item.key === e.key);
        onChange(selectedItem.id);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[topicKey]}
            mode='horizontal'
            items={items}
        />
    );
}
