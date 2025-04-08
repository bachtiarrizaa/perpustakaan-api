const { Author } = require('../../models');

const updatedAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const { name, address, telp } = req.body;

    if(!name || !address || !telp) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field wajib diisi'
      });
    }

    const author = await Author.findByPk(authorId);

    if(!author) {
      return res.status(404).json({
        status: 'fail',
        message: 'Author tidak ditemukan'
      });
    }

    await author.update({
      name, address, telp
    });

    return res.status(200).json({
      status: 'success',
      message: 'Author berhasil diperbarui',
      data: author
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = updatedAuthor;