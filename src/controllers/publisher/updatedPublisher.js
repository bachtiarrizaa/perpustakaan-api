const { Publisher } = require('../../models');

const updatedPublisher = async (req, res, next) => {
  try {
    const { publisherId } = req.params;
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field wajib diisi'
      });
    }

    const publisher = await Publisher.findByPk(publisherId);

    if (!publisher) {
      return res.status(404).json({
        status: 'fail',
        message: 'Publisher tidak ditemukan'
      });
    }

    await publisher.update({
      name, address
    });

    return res.status(201).json({
      status: 'success',
      message: 'Publisher berhasil ditambahakn',
      data: publisher
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = updatedPublisher;