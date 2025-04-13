const { Loan, Book, User } = require('../../models');

const getLoanHistoty = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized! user not found'
      });
    }

    const loans = await Loan.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Book,
          as: 'book',
        },
        {
          model: User,
          as: 'user'
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      status: 'success',
      message: 'Riwayat peminjaman ditemukan',
      data: loans
    });
  } catch (error) {
    console.log('Error getLoanHistory: ', error.message);
    return res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

module.exports = getLoanHistoty;