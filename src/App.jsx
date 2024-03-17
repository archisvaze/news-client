import { ConfigProvider, theme as antDTheme } from 'antd';
import React from 'react';
import Footer from './components/Footer';
import News from './components/News';
import { useThemeDetector } from './hooks/useThemeDetector';

export default function App() {
    const isDarkTheme = useThemeDetector();

    return (
        <div style={{ width: '100%', background: isDarkTheme ? 'rgb(30,30,30)' : 'rgb(245,245,245)' }}>
            <ConfigProvider
                theme={{
                    algorithm: isDarkTheme ? antDTheme.darkAlgorithm : antDTheme.defaultAlgorithm,
                    token: {
                        colorPrimary: isDarkTheme ? 'rgb(62,164,247)' : 'rgb(52,126,221)',
                    },
                }}
            >
                <News />
                <Footer />
            </ConfigProvider>
        </div>
    );
}
