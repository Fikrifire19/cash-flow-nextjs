import db from '../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).json({
        status: 'fail',
        message: 'Method salah!'
    }).end();

    const { id } = req.query;

    const deleteData = await db('cash_flow').where({id}).del();

    res.status(200);
    res.json({
        status: 'success',
        message: 'Data berhasil dihapus!'
    });
}