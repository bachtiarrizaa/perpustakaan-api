const { Author } = require('../../models');

const deleteAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;

    const author = await Author.findByPk(authorId);

    if(!author){
      return res.status(404).json({
        status: 'fail',
        message: 'Author tidak ditemukan'
      });
    }

    await author.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Author berhasil dihapus'
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
};

module.exports = deleteAuthor;