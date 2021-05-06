import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({
        status: 'fail',
        message: 'Method salah!'
    }).end();

    const cashFlow = await db('cash_flow');

    res.status(200);
    res.json({
        status: 'success',
        message: 'Data cash flow berhasil didapat!',
        data: cashFlow
    });
}