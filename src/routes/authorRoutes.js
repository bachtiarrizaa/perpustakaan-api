const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');
const { mustPetugas } = require('../middleware/authMiddleware');

router.post('/create', mustPetugas, authorController.createAuthor);
router.get('/get-all', mustPetugas, authorController.getAllAuthors);

module.exports = router;