import { ConfigProvider, theme as antDTheme } from 'antd';
import React, { useState } from 'react';
import News from './News';

export default function App() {
    const [theme, setTheme] = useState('light');
    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: theme === 'dark' ? antDTheme.darkAlgorithm : antDTheme.defaultAlgorithm,
                }}
            >
                <News
                    theme={theme}
                    setTheme={setTheme}
                />
            </ConfigProvider>
        </>
    );
}
