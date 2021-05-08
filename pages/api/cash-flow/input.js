import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({
        status: 'fail',
        message: 'Method salah!'
    }).end();

    const { tanggalTransaksi, kodeTransaksi, itemTransaksi, strukTransaksi, credit, debit } = req.body;

    const allCredit = await db('cash_flow').sum('credit as c');
    const allDebit = await db('cash_flow').sum('debit as d');

    let saldo = allCredit[0].c - allDebit[0].d;

    const inputData = await db('cash_flow').insert({
        "tanggal-transaksi": tanggalTransaksi,
        "kode-transaksi": kodeTransaksi,
        "item-transaksi": itemTransaksi,
        "struk-transaksi": strukTransaksi,
        credit,
        debit,
        saldo
    });

    const inputedData = await db('cash_flow').where('id', inputData).first();

    res.status(201);
    res.json({
        status: 'success',
        message: 'Input data berhasil!',
        data: inputedData
    });
}