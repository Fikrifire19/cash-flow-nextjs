import db from '../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== 'PUT') return res.status(405).json({
        status: 'fail',
        message: 'Method salah!'
    }).end();

    const { id } = req.query;

    const { tanggalTransaksi, kodeTransaksi, itemTransaksi, strukTransaksi, credit, debit } = req.body;

    const saldo = credit - debit;

    const updateData = await db('cash_flow').where({id}).update({
        "tanggal-transaksi": tanggalTransaksi,
        "kode-transaksi": kodeTransaksi,
        "item-transaksi": itemTransaksi,
        "struk-transaksi": strukTransaksi,
        credit,
        debit,
        saldo
    });
/*
    const allCredit = await db('cash_flow').sum('credit');
    const allDebit = await db('cash_flow').sum('debit');

    const saldo = allCredit - allDebit;
    const inputSaldo = await db('cash_flow').where({id}).update({"tanggal-transaksi": tanggalTransaksi,
    "kode-transaksi": kodeTransaksi,
    "item-transaksi": itemTransaksi,
    "struk-transaksi": strukTransaksi,
    credit,
    debit, saldo});
*/
    const updatedData = await db('cash_flow').where({id}).first();

    res.status(201);
    res.json({
        status: 'success',
        message: 'Update data berhasil!',
        data: updatedData
    });
}