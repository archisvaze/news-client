export default function handler(req, res) {
    return res.status(200).json({
        message: 'Hello from Vercel Serverless!',
        time: new Date().toISOString(),
    });
}
