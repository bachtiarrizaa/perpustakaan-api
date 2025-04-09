const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const authorRoutes = require('./authorRoutes');
const publisherRoutes = require('./publisherRoutes');

router.use('/auth', authRoutes);
router.use('/author', authorRoutes);
router.use('/publisher', publisherRoutes);

module.exports = router;