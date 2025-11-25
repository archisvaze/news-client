import Parser from 'rss-parser';

export default async function handler(req, res) {
    // CORS – only if needed
    const allowedOrigins = ['https://lookupnews.vercel.app'];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }

    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    console.log('\nFetching news…');

    try {
        const { search, hl, gl, ceid, topicId } = req.query;
        console.log('search =', search);
        console.log('hl =', hl);
        console.log('gl =', gl);
        console.log('ceid =', ceid);
        console.log('topicId =', topicId);

        let feedUrl = 'https://news.google.com/rss';
        let hasParams = false;

        if (topicId) {
            feedUrl += `/topics/${topicId}`;
        }

        if (search) {
            feedUrl += `/search?q=${encodeURIComponent(search)}`;
            hasParams = true;
        }

        if (hl) {
            feedUrl += hasParams ? `&hl=${hl}` : `?hl=${hl}`;
            hasParams = true;
        }

        if (gl) {
            feedUrl += hasParams ? `&gl=${gl}` : `?gl=${gl}`;
            hasParams = true;
        }

        if (ceid) {
            feedUrl += hasParams ? `&ceid=${ceid}` : `?ceid=${ceid}`;
        }

        console.log('URL:', feedUrl);

        const parser = new Parser();
        const feed = await parser.parseURL(feedUrl);

        return res.status(200).json(feed);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'An unexpected error occurred while fetching the news.',
        });
    }
}
