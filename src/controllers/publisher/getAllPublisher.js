const { Publisher } = require('../../models');

const getAllPublisher = async (req, res, next) => {
  try {
    const publisher = await Publisher.findAll({
      attributes: ['id', 'name', 'address']
    });
  
    return res.status(200).json({
      status: 'success',
      data: { publisher: publisher || []}
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getAllPublisher;