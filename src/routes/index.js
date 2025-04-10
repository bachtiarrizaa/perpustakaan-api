const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const authorRoutes = require('./authorRoutes');
const publisherRoutes = require('./publisherRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/auth', authRoutes);
router.use('/author', authorRoutes);
router.use('/publisher', publisherRoutes);
router.use('/book', bookRoutes);

module.exports = router;