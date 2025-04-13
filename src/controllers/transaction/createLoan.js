const { Loan, User, Book } = require('../../models');

const createLoan = async(req, res, next) => {
  try {
    const { book_id, borrow_date, return_date } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized! User not found'
      });
    }

    if (!book_id || !borrow_date || !return_date) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field wajib diisi'
      });
    }

    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      });
    }

    if (book.stock <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Stok buku habis'
      });
    }

    const borrowDate = new Date(borrow_date);
    const returnDate = new Date(return_date);

    if (returnDate < borrowDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Tanggal pengembalian tidak boleh lebih kecil daripada tanggal peminjaman'
      });
    }

    const diffTime = returnDate - borrowDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
      return res.status(400).json({
        status: 'fail',
        message: 'Maksimal peminjaman hanya 7 hari'
      });
    }

    book.stock -= 1;
    await book.save();

    const loan = await Loan.create({
      user_id: req.user.id,
      book_id,
      borrow_date: borrowDate,
      return_date: returnDate
    });

    return res.status(201).json({
      status: 'success',
      message: 'Peminjaman berhasil',
      data: loan
    });
  } catch (error) {
    console.log('Error createLoan: ', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

module.exports = createLoan;