import { useState } from 'react';

export default function Hello() {
    const [data, setData] = useState(null);

    async function callApi() {
        console.log('Calling API...');
        const res = await fetch('/api/hello');
        const json = await res.json();
        console.log('API Response:', json);
        setData(json);
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Vercel Functions Demo</h1>

            <button
                onClick={callApi}
                style={{
                    padding: '10px 20px',
                    background: 'black',
                    color: 'white',
                    borderRadius: 6,
                }}
            >
                Call API
            </button>

            {data && <pre style={{ marginTop: 20, background: '#eee', padding: 20 }}>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
