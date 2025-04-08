const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const authorRoutes = require('./authorRoutes');

router.use('/auth', authRoutes);
router.use('/author', authorRoutes);

module.exports = router;