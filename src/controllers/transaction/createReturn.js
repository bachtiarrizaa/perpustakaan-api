const { Return, Loan } = require('../../models');

const createReturn = async (req, res, next) => {
  try {
    
    const { loan_id, actual_return_date } = req.body;
    console.log('Request body:', req.body);

    if (!loan_id || !actual_return_date) {
      return res.status(400).json({
        status: 'fail',
        message: 'loan_id dan actual_return_date wajib diisi'
      });
    }

    const loan = await Loan.findByPk(loan_id);
    if (!loan) {
      return res.status(404).json({
        status: 'fail',
        message: 'Data peminjaman tidak ditemukan'
      });
    }

    const existReturn = await Return.findOne({
      where: { loan_id }
    });

    if (existReturn) {
      return res.status(400).json({
        status: 'fail',
        message: 'Buku sudah dikembalikan sebelumnya'
      });
    }

    const returnBook = await Return.create({
      loan_id,
      actual_return_date
    });

    await loan.update({ status: 'dikembalikan' });

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil mengembalikan buku',
      data: returnBook
    });
  } catch (error) {
    console.log('Error createReturn: ', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

module.exports = createReturn;
