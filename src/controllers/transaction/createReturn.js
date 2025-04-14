const { Return, Loan } = require('../../models');

const createReturn = async (req, res, next) => {
  try {
    
    const { loan_id, actual_return_date } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized! User not found'
      });
    }

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

    if (loan.user_id !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'Kamu tidak memiliki izin untuk mengembalikan buku ini'
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

    const actualReturnDate = new Date(actual_return_date);
    const borrowDate = new Date(loan.borrow_date);
    const returnDate = new Date(loan.return_date);

    if (actualReturnDate < borrowDate || actualReturnDate > returnDate) {
      return res.status(400).json({
        status: 'fail',
        message: `Tanggal pengembalian harus antara ${borrowDate.toISOString().split('T')[0]} dan ${returnDate.toISOString().split('T')[0]}`
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
