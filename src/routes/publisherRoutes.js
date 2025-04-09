 const express = require('express');
 const router = express.Router();
 const publisherController = require('../controllers/publisher');
 const { mustPetugas } = require('../middleware/authMiddleware');

 router.post('/create', mustPetugas, publisherController.createPublisher);
 router.get('/get-all', mustPetugas, publisherController.getAllPublisher);
 router.put('/:publisherId', mustPetugas, publisherController.updatedPublisher);
 router.delete('/:publisherId', mustPetugas, publisherController.deletePublisher);

 module.exports = router;