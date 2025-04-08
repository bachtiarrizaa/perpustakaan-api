const { Author } = require('../../models');

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.findAll({
      attributes: ['id', 'name', 'address', 'telp'],
    });

    return res.status(200).json({
      status: 'success',
      data: { authors: authors || [] },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = getAllAuthors;