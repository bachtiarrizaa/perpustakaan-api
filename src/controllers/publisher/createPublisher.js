const { Publisher, User } = require('../../models');

const createPublisher = async (req, res, next) => {
  try {
    const { name, address } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized! User not found'
      });
    }

    if (!name || !address) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field wajib diisi'
      });
    }

    const publisher = await Publisher.create({
      name,
      address,
      user_id: req.user.id,
    });

    const result = await Publisher.findOne({
      where: { id: publisher.id },
      include: {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    });

    return res.status(201).json({
      status: 'success',
      message: 'Publisher berhasil ditambahkan',
      data: {
        id: result.id,
        name: result.name,
        address: result.address,
        createdBy: result.user.name,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = createPublisher;