const { Book, Author, Publisher } = require('../../models');

const createBook = async (req, res, next) => {
  try {
    const { title, year, stock, author_id, publisher_id } = req.body;

    if (!title || !year || !stock || !author_id || !publisher_id) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field wajib diisi'
      });
    }

    const existBook = await Book.findOne({
      where: { title }
    });

    if (existBook) {
      return res.status(400).json({
        status: 'fail',
        message: 'Judul buku ini sudah ada'
      });
    }

    const book = await Book.create({
      title,
      year,
      stock,
      author_id,
      publisher_id
    });

    const newBook = await Book.findOne({
      where: { id: book.id },
      include: [
        { model: Author, as: 'author', attributes: ['name'] },
        { model: Publisher, as: 'publisher', attributes: ['name'] }
      ]
    });    

    return res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        id: newBook.id,
        title: newBook.title,
        year: newBook.year,
        stock: newBook.stock,
        author: newBook.author.name,
        publisher: newBook.publisher.name
      }
    });
  } catch (error) {
    console.error('Error createBook:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

module.exports = createBook;
