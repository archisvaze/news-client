import React from 'react';

export default function Footer({ color }) {
    return (
        <footer
            style={{
                width: '100%',
                display: 'flex',
                gap: '16px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px',
            }}
        >
            <span>Powered by Google News RSS</span>
            <a
                href='https://archisvaze.vercel.app/'
                target='_blank'
                style={{ fontSize: '12px', color: color, textDecoration: 'none' }}
            >
                Made by Archis
            </a>
        </footer>
    );
}
