const { Book, Author, Publisher } = require('../../models');

const updatedBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { title, year, stock, author_id, publisher_id } = req.body;

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(400).json({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      });
    }

    if (title && title !== book.title) {
      const titleExist = await Book.findOne({ where: { title } });
      if (titleExist) {
        return res.status(400).json({
          status: 'fail',
          message: 'Judul buku sudah digunakan'
        });
      }
    }

    await book.update({
      title,
      year,
      stock,
      author_id,
      publisher_id
    });

    const updatedBook = await Book.findByPk(bookId, {
      include: [
        { model: Author, as: 'author', attributes: ['name'] },
        { model: Publisher, as: 'publisher', attributes: ['name'] }
      ]
    });

    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        id: updatedBook.id,
        title: updatedBook.title,
        year: updatedBook.year,
        stock: updatedBook.stock,
        author: updatedBook.author?.name,
        publisher: updatedBook.publisher?.name
      }
    });
  } catch (error) {
    console.log('Error updatedBook: ', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'terjadi kesalahan server',
      error: error.message
    });
  }
};

module.exports = updatedBook;