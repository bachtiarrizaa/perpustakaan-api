const { where } = require('sequelize');
const { Author, User } = require('../../models');

const createAuthor = async(req, res, next) => {
  try {
    const { name, address, telp } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized! User not found'
      });
    }

    if (!name || !address || !telp) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field wajib diisi!'
      });
    }

    const author = await Author.create({
      name,
      address,
      telp,
      user_id: req.user.id,
    });

    const result = await Author.findOne({
      where: { id: author.id },
      include: {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    });

    return res.status(201).json({
      status: 'success',
      message: 'Author berhasil ditambahkan',
      data: {
        id: result.id,
        name: result.name,
        address: result.address,
        telp: result.telp,
        createdBy: result.user.name, // ganti nama propertinya di sini
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = createAuthor;