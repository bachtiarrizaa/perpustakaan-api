const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const authorRoutes = require('./authorRoutes');
const publisherRoutes = require('./publisherRoutes');
const bookRoutes = require('./bookRoutes');
const transactionRoutes = require('./transactionRoutes');

router.use('/auth', authRoutes);
router.use('/author', authorRoutes);
router.use('/publisher', publisherRoutes);
router.use('/book', bookRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;