 const express = require('express');
 const router = express.Router();
 const publisherController = require('../controllers/publisher');
 const { mustPetugas } = require('../middleware/authMiddleware');

 router.post('/create', mustPetugas, publisherController.createPublisher);

 module.exports = router;