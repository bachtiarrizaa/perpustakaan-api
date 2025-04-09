const { Publisher } = require('../../models');

const deletePublisher = async (req, res, next) => {
  try {
    const { publisherId } = req.params;

    const publisher = await Publisher.findByPk(publisherId);

    if (!publisher) {
      return res.status(404).json({
        status: 'fail',
        message: 'Publisher tidak ditemukan'
      });
    }

    await publisher.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Publisher berhasil dihapus'
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = deletePublisher;