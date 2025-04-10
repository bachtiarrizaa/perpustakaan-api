const { Book, Author, Publisher } = require('../../models');

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['name']
        },
        {
          model: Publisher,
          as: 'publisher',
          attributes: ['name']
        }
      ],
      // order: [['createdAt', 'DESC']]
    });

    const allBooks = books.map(book => ({
      id: book.id,
      title: book.title,
      year: book.year,
      stock: book.stock,
      author: book.author?.name,
      publisher: book.publisher?.name
    }));

    return res.status(200).json({
      status: 'success',
      data: allBooks
    });
  } catch (error) {
    console.error('Error getAllBooks:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
      error: error.message
    })
  }
};

module.exports = getAllBooks;