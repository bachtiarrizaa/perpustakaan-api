const { Book } = require('../../models');

const deleteBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      });
    }

    await book.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
  } catch (error) {
    console.log('Error deleteBook: ', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

module.exports = deleteBook;