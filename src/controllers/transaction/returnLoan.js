const { Loan, Book } = require('../../models');

const returnLoan = async (req, res, next) => {
  try {
    const { loanId } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized! user not found'
      });
    }

    const loan = await Loan.findOne({
      where: {
        id: loanId,
        user_id: req.user.id,
        status: 'dipinjam'
      },
      include: {
        model: Book,
        as: 'book'
      }
    });

    if (!loan) {
      return res.status(404).json({
        status: 'fail',
        message: 'Data peminjaman tidak ditemukan'
      });
    }

    loan.book.stock += 1;
    await loan.book.save();

    loan.status = 'dikembalikan';
    loan.actual_return_date = new Date();
    await loan.save();

    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dikembalikan',
      data: loan
    });
  } catch (error) {
    console.log('Error returnLoan: ', error.message);
    return res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }  
};

module.exports = returnLoan;
