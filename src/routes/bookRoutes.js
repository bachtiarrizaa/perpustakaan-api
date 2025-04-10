const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const { mustPetugas, mustLogin } = require('../middleware/authMiddleware');

router.post('/create', mustPetugas, bookController.createBook);
router.get('/get-all', mustLogin, bookController.getAllBooks);
router.put('/:bookId', mustPetugas, bookController.updatedBook);

module.exports = router;