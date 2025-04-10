const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const { mustPetugas } = require('../middleware/authMiddleware');

router.post('/create', mustPetugas, bookController.createBook);

module.exports = router;